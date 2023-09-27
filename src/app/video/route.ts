import { NextRequest, NextResponse } from 'next/server';
import { type ReadStream, createReadStream, stat, fstatSync, statSync } from 'node:fs';
import { statfs } from 'node:fs/promises';

async function* streamToIterator(stream: ReadStream) {
  for await (let chunk of stream) {
    yield chunk;
  }
}

function iteratorToReadableStream(iterator: AsyncGenerator<any>) {
  return new ReadableStream({
    pull(controller) {
      async function pump() {
        const { value, done } = await iterator.next();

        if (done) {
          controller.close();
          return;
        }

        controller.enqueue(new Uint8Array(value));
        return pump();
      }

      return pump();
    },
  });
}

export async function GET(req: NextRequest) {
  const videoPath = 'myVideo.MPG';

  const range = req.headers.get('range');
  if (!range) {
    throw new Error('There should be header range');
  }
  const videoSize = statSync(videoPath).size;
  const CHUNK_SIZE = 1024 * 1024;
  const start = Number(range.replace(/\D/g, ''));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
  const contentLength = end - start;

  const newHeaders = new Headers(req.headers);
  newHeaders.set('Content-Type', 'video/mpeg');
  newHeaders.set('Content-Length', contentLength + '');
  newHeaders.set('Accept-Ranges', 'bytes');
  newHeaders.set('Content-Range', `bytes ${start}-${end}/${videoSize}`);

  const stream = createReadStream(videoPath, { start, end });
  const iterator = streamToIterator(stream);
  const readableStream = iteratorToReadableStream(iterator);

  return new Response(readableStream, { headers: newHeaders, status: 206 });
}
