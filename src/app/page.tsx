import { Flex, Grid, Heading, IconButton, Table, Tooltip } from '@radix-ui/themes';
import { SearchInput } from './components/SearchInput';
import { PlusIcon } from '@radix-ui/react-icons';

export default function Home() {
  return (
    <Grid className="p-12" gap="9">
      <Heading align="center">Video Streaming app</Heading>

      <Flex direction="column" align="center" gap="7">
        <Flex justify="between" gap="7" className="w-3/5">
          <SearchInput className="flex-1" />

          <Tooltip content="Upload new video" delayDuration={200}>
            <IconButton variant="soft" className="cursor-pointer">
              <PlusIcon />
            </IconButton>
          </Tooltip>
        </Flex>

        <Table.Root variant="surface" className="w-3/5">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Video name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Length</Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.RowHeaderCell>Methano</Table.RowHeaderCell>
              <Table.Cell>3:40</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.RowHeaderCell>Methano</Table.RowHeaderCell>
              <Table.Cell>3:40</Table.Cell>
            </Table.Row>

            <Table.Row>
              <Table.RowHeaderCell>Methano</Table.RowHeaderCell>
              <Table.Cell>3:40</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table.Root>
      </Flex>
    </Grid>
  );
}
