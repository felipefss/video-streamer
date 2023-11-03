import { NextRequest } from 'next/server';
import { type ReadStream, createReadStream, statSync } from 'node:fs';
import { storage } from '../../_lib/appwrite';
import { env } from '@/env';
import { Readable } from 'node:stream';

async function* streamToIterator(stream: Readable) {
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

interface ReqParams {
  params: {
    id: string;
  };
}

export async function GET(req: NextRequest, { params: { id: videoId } }: ReqParams) {
  const videoMetaData = await storage.getFile(env.VIDEOS_BUCKET_ID, videoId);
  const videoFile = await storage.getFileView(env.VIDEOS_BUCKET_ID, videoId);

  console.log({ videoMetaData });
  const videoPath = 'video.mp4';

  const range = req.headers.get('range');
  if (!range) {
    throw new Error('There should be header range');
  }
  const videoSize = videoMetaData.sizeOriginal;
  const CHUNK_SIZE = 1024 * 1024;
  const start = Number(range.replace(/\D/g, ''));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
  const contentLength = end - start;

  const newHeaders = new Headers(req.headers);
  newHeaders.set('Content-Type', 'video/mp4');
  newHeaders.set('Content-Length', contentLength + '');
  newHeaders.set('Accept-Ranges', 'bytes');
  newHeaders.set('Content-Range', `bytes ${start}-${end}/${videoSize}`);

  // const stream = createReadStream(videoPath, { start, end });
  const iterator = streamToIterator(Readable.from(videoFile));
  const readableStream = iteratorToReadableStream(iterator);

  return new Response(readableStream, { headers: newHeaders, status: 206 });
}
