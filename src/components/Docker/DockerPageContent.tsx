'use client';

import { Container, Title, Group, Collapse, Button } from '@mantine/core';
import { DockerList } from './DockerList';
import { ContainerActions } from './ContainerActions';
import { useState } from 'react';
import type { DockerContainerInfo } from '@/types/api';
import Link from 'next/link';
import { IconPlus } from '@tabler/icons-react';

export function DockerPageContent({ containers }: { containers: DockerContainerInfo[] }) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  // Get first selected container's state for bulk actions
  const firstSelectedContainer = containers.find(c => selectedRows.has(c.Id));
  const selectedContainerState = firstSelectedContainer?.State || '';

  return (
    <Container fluid>
      <Group justify="space-between" mb="lg">
        <Title order={2}>Docker Containers</Title>
        <Group>
            <Collapse in={selectedRows.size > 0} transitionDuration={300} transitionTimingFunction="ease">
            <ContainerActions 
                containerId={Array.from(selectedRows).join(',')} 
                containerState={selectedContainerState}
            />
            </Collapse>
            <Button component={Link} href="/docker/containers/new" leftSection={<IconPlus size={16} />}>
                Add Container
            </Button>
        </Group>
      </Group>
      <DockerList 
        containers={containers} 
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
      />
    </Container>
  );
}
