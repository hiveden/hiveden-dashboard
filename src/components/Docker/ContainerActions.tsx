'use client';

import { Button, Group } from '@mantine/core';
import { IconPlayerPlay, IconPlayerStop, IconRefresh, IconTrash } from '@tabler/icons-react';
import { useState } from 'react';
import { stopContainer, startContainer, removeContainer } from '@/actions/docker';
import { useRouter } from 'next/navigation';

export function ContainerActions({ containerId, containerState }: { containerId: string, containerState: string }) {
  const [loading, setLoading] = useState<string | null>(null);
  const router = useRouter();

  const handleStart = async () => {
    setLoading('start');
    await startContainer(containerId);
    setLoading(null);
    router.refresh();
  };

  const handleStop = async () => {
    setLoading('stop');
    await stopContainer(containerId);
    setLoading(null);
    router.refresh();
  };

  const handleRestart = async () => {
    setLoading('restart');
    // TODO: Implement restart action when available in API
    setLoading(null);
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this container?')) return;
    setLoading('delete');
    await removeContainer(containerId);
    setLoading(null);
    router.push('/docker');
  };

  const isRunning = containerState === 'running';

  return (
    <Group gap="xs">
      {isRunning ? (
        <Button
          variant="light"
          color="orange"
          leftSection={<IconPlayerStop size={16} />}
          onClick={handleStop}
          loading={loading === 'stop'}
        >
          Stop
        </Button>
      ) : (
        <Button
          variant="light"
          color="green"
          leftSection={<IconPlayerPlay size={16} />}
          onClick={handleStart}
          loading={loading === 'start'}
        >
          Start
        </Button>
      )}
      
      <Button
        variant="light"
        color="blue"
        leftSection={<IconRefresh size={16} />}
        onClick={handleRestart}
        loading={loading === 'restart'}
      >
        Restart
      </Button>
      
      <Button
        variant="light"
        color="red"
        leftSection={<IconTrash size={16} />}
        onClick={handleDelete}
        loading={loading === 'delete'}
      >
        Delete
      </Button>
    </Group>
  );
}
