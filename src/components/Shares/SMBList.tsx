'use client';

import { deleteSmbShare } from '@/actions/shares';
import { Table, Group, ActionIcon, Badge } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { useState } from 'react';

export function SMBList({ shares }: { shares: any[] }) {
  const [loading, setLoading] = useState<string | null>(null);

  const handleDelete = async (name: string) => {
    if (!confirm('Are you sure?')) return;
    setLoading(name);
    await deleteSmbShare(name);
    setLoading(null);
  };

  const rows = shares.map((share) => (
    <Table.Tr key={share.name}>
      <Table.Td>{share.name}</Table.Td>
      <Table.Td>{share.path}</Table.Td>
      <Table.Td>
        <Badge color={share.read_only ? 'orange' : 'green'}>
          {share.read_only ? 'Read Only' : 'Read/Write'}
        </Badge>
      </Table.Td>
      <Table.Td>
        <ActionIcon 
          variant="light" 
          color="red" 
          onClick={() => handleDelete(share.name)}
          loading={loading === share.name}
        >
          <IconTrash size={16} />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th>Path</Table.Th>
          <Table.Th>Access</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
