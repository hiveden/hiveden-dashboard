'use client';

import { startLxcContainer, stopLxcContainer, deleteLxcContainer } from '@/actions/lxc';
import { LXCContainer, LXCContainerCreate } from '@/lib/client';
import { Button, Table, Group, Badge, ActionIcon } from '@mantine/core';
import { IconTrash, IconPlayerPlay, IconPlayerStop } from '@tabler/icons-react';
import { useState } from 'react';

export function LXCList({ containers }: { containers: LXCContainer[] }) {
  const [loading, setLoading] = useState<string | null>(null);

  const handleStart = async (name: string) => {
    setLoading(name);
    await startLxcContainer(name);
    setLoading(null);
  };

  const handleStop = async (name: string) => {
    setLoading(name);
    await stopLxcContainer(name);
    setLoading(null);
  };

  const handleDelete = async (name: string) => {
    if (!confirm('Are you sure?')) return;
    setLoading(name);
    await deleteLxcContainer(name);
    setLoading(null);
  };

  const rows = containers.map((container) => (
    <Table.Tr key={container.name}>
      <Table.Td>{container.name}</Table.Td>
      <Table.Td>{container.status}</Table.Td>
      <Table.Td>{container.ipv4}</Table.Td>
      <Table.Td>
        <Group gap="xs">
          <ActionIcon 
            variant="light" 
            color="green" 
            onClick={() => handleStart(container.name)}
            loading={loading === container.name}
            disabled={container.status === 'Running'}
          >
            <IconPlayerPlay size={16} />
          </ActionIcon>
          <ActionIcon 
            variant="light" 
            color="orange" 
            onClick={() => handleStop(container.name)}
            loading={loading === container.name}
            disabled={container.status === 'Stopped'}
          >
            <IconPlayerStop size={16} />
          </ActionIcon>
          <ActionIcon 
            variant="light" 
            color="red" 
            onClick={() => handleDelete(container.name)}
            loading={loading === container.name}
          >
            <IconTrash size={16} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Name</Table.Th>
          <Table.Th>Status</Table.Th>
          <Table.Th>IP</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
}
