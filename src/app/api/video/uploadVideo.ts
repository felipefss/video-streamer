import { NextRequest, NextResponse } from 'next/server';
import { storage } from '../_lib/appwrite';
import { ID, InputFile } from 'node-appwrite';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get('file') as Blob | null;
  const fileName = formData.get('fileName') as string | null;
  const generatedFileName = new Date().getTime() + '';

  if (!file) {
    return NextResponse.json(
      {
        error: 'File blob is required',
      },
      { status: 400 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    await storage.createFile(
      process.env.VIDEOS_BUCKET_ID as string,
      ID.unique(),
      InputFile.fromBuffer(buffer, fileName ?? generatedFileName)
    );
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: 'Something bad happened.',
      },
      { status: 500 }
    );
  }

  return NextResponse.json({}, { status: 200 });
}
