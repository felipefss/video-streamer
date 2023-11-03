import { database } from '@/app/api/_lib/appwrite';
import { env } from '@/env';
import { convertSecondsToMinutes } from '@/utils/convert';
import { Table } from '@radix-ui/themes';
import { Models } from 'node-appwrite';

interface Video extends Models.Document {
  name: string;
  video_id: string;
  video_length: number;
}

interface Props {
  className?: string;
}

export async function VideosList({ className }: Props) {
  async function getVideosList() {
    const response = await database.listDocuments<Video>(env.DATA_DB_ID, env.VIDEOS_DB_COLLECTION_ID);

    return response.documents;
  }

  const listOfVideos = await getVideosList();

  return (
    <Table.Root variant="surface" className={className}>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>Video name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Length</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {listOfVideos.map((video) => (
          <Table.Row key={video.$id}>
            <Table.RowHeaderCell>{video.name}</Table.RowHeaderCell>
            <Table.Cell>{convertSecondsToMinutes(video.video_length)}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
}
