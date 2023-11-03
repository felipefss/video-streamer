import { Flex, Heading, IconButton } from '@radix-ui/themes';
import { SearchInput } from '../components/SearchInput';
import { PlusIcon } from '@radix-ui/react-icons';
import { VideosList } from '../components/VideosList';
// import { VideosListProvider } from './contexts/VideosListContext';
import { UploadFileDialog } from '../components/UploadFileDialog';
import { Suspense } from 'react';

export default function Home() {
  return (
    <div className="p-12">
      <Heading align="center" className="mb-20">
        Video Streaming app
      </Heading>

      <Flex direction="column" align="center" gap="7">
        <Flex justify="between" gap="7" className="w-3/5">
          <SearchInput className="flex-1" />

          <UploadFileDialog>
            <IconButton variant="soft" className="cursor-pointer bg-[--accent-a3]">
              <PlusIcon />
            </IconButton>
          </UploadFileDialog>
        </Flex>

        {/* <VideosListProvider> */}
        <Suspense fallback={<h2>Loading...</h2>}>
          <VideosList className="w-3/5" />
        </Suspense>
        {/* </VideosListProvider> */}
      </Flex>
    </div>
  );
}
