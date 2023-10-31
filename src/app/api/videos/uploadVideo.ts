import { NextRequest, NextResponse } from 'next/server';
import { database, storage } from '../_lib/appwrite';
import { AppwriteException, ID, InputFile } from 'node-appwrite';
import { env } from '@/env';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get('file') as Blob | null;
  const fileName = formData.get('fileName') as string;

  if (!file) {
    return NextResponse.json(
      {
        error: 'File blob is required',
      },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const videoStart = buffer.indexOf(Buffer.from('mvhd')) + 17;
  const timeScale = buffer.readUint32BE(videoStart);
  const duration = buffer.readUint32BE(videoStart + 4);
  const videoLength = Math.floor((duration / timeScale) * 1000) / 1000;

  try {
    console.log(`${new Date().toISOString()} - Upload started for ${fileName}`);
    const response = await storage.createFile(
      env.VIDEOS_BUCKET_ID,
      ID.unique(),
      InputFile.fromBuffer(buffer, `${fileName}.mp4`)
    );
    console.log(`${new Date().toISOString()} - Upload ended for ${fileName}`);

    // Save uploaded file info in the db
    await database.createDocument(env.DATA_DB_ID, env.VIDEOS_DB_COLLECTION_ID, ID.unique(), {
      name: fileName,
      video_id: response.$id,
      video_url: `https://cloud.appwrite.io/v1/storage/buckets/${env.VIDEOS_BUCKET_ID}/files/${response.$id}/view?project=${env.APPWRITE_PROJECT_ID}`,
      video_length: videoLength,
    });
  } catch (err) {
    const error = err as AppwriteException;
    console.error(error);

    return NextResponse.json(
      {
        error: error.message,
      },
      { status: error.code ?? 500 }
    );
  }

  return NextResponse.json({}, { status: 200 });
}
