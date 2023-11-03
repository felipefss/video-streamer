import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { Box, Container, Flex, Grid, IconButton } from '@radix-ui/themes';
import Link from 'next/link';

interface Props {
  params: {
    id: string;
  };
}

export default function Video({ params: { id } }: Props) {
  return (
    <Grid width="auto" gap="9">
      <Box ml="5" mt="5">
        <Link href="/">
          <IconButton variant="ghost" className="cursor-pointer">
            <ArrowLeftIcon />
          </IconButton>
        </Link>
      </Box>
      <Container className="bg-gray-900">
        <Flex justify="center">
          <video src={`/api/videos/${id}`} className="rounded-lg h-[30rem]" controls />
        </Flex>
      </Container>
    </Grid>
  );
}
