import { env } from '@/env';
import { Client, Databases, Storage } from 'node-appwrite';

const client = new Client();

client
  .setEndpoint(env.APPWRITE_ENDPOINT as string)
  .setProject(env.APPWRITE_PROJECT_ID as string)
  .setKey(env.APPWRITE_API_KEY as string);

export const storage = new Storage(client);

export const database = new Databases(client);
