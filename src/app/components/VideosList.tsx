import { Table } from '@radix-ui/themes';

interface Props {
  className?: string;
}

export function VideosList({ className }: Props) {
  return (
    <Table.Root variant="surface" className={className}>
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
  );
}
