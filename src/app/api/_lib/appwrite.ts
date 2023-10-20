import { Client, Storage } from 'node-appwrite';

const client = new Client();

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('653043821007630f58d6')
  .setKey(process.env.APPWRITE_API_KEY as string);

export const storage = new Storage(client);

// storage.createFile('', ID.unique(), InputFile.fromBlob())
