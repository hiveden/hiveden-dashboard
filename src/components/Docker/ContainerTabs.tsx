'use client';

import { SegmentedControl, Card, Text, Badge, Stack, Code, SimpleGrid, Box, Tooltip } from '@mantine/core';
import { IconTerminal } from '@tabler/icons-react';
import { useState } from 'react';
import type { DockerContainerInfo } from '@/types/api';
import { ContainerLogs } from './ContainerLogs';

export function ContainerTabs({ container }: { container: DockerContainerInfo }) {
  const [activeTab, setActiveTab] = useState('info');

  return (
    <>
      <Tooltip.Group>
        <SegmentedControl
          value={activeTab}
          onChange={setActiveTab}
          data={[
            { label: 'Container Information', value: 'info' },
            { label: 'Logs', value: 'logs' },
            { label: 'Raw Data', value: 'raw' },
            { 
              label: (
                <Tooltip label="Not implemented yet" position="top">
                  <span>Shell</span>
                </Tooltip>
              ),
              value: 'shell',
              disabled: true,
            },
          ]}
          mb="md"
        />
      </Tooltip.Group>

      {activeTab === 'info' && (
        <Stack gap="md">
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text fw={500} size="lg" mb="md">Basic Information</Text>
            <SimpleGrid cols={{ base: 1, md: 2 }}>
              <div>
                <Text size="sm" c="dimmed">Name</Text>
                <Text fw={500}>{container.Name || 'N/A'}</Text>
              </div>
              <div>
                <Text size="sm" c="dimmed">ID</Text>
                <Code>{container.Id}</Code>
              </div>
              <div>
                <Text size="sm" c="dimmed">Image</Text>
                <Text fw={500}>{container.Image}</Text>
              </div>
              <div>
                <Text size="sm" c="dimmed">State</Text>
                <Badge color={container.State === 'running' ? 'green' : 'gray'}>
                  {container.State || 'Unknown'}
                </Badge>
              </div>
              {container.Status && (
                <div>
                  <Text size="sm" c="dimmed">Status</Text>
                  <Text fw={500}>{container.Status}</Text>
                </div>
              )}
              {container.Command && (
                <div>
                  <Text size="sm" c="dimmed">Command</Text>
                  <Code block>{container.Command}</Code>
                </div>
              )}
            </SimpleGrid>
          </Card>

          {container.Env && container.Env.length > 0 && (
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Text fw={500} size="lg" mb="md">Environment Variables</Text>
              <Stack gap="xs">
                {container.Env.map((env, idx) => (
                  <div key={idx}>
                    <Text size="sm" c="dimmed">{env.Name}</Text>
                    <Code block>{env.Value}</Code>
                  </div>
                ))}
              </Stack>
            </Card>
          )}

          {container.Ports && container.Ports.length > 0 && (
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Text fw={500} size="lg" mb="md">Port Mappings</Text>
              <SimpleGrid cols={{ base: 1, md: 2 }}>
                {container.Ports.map((port, idx) => (
                  <div key={idx}>
                    <Text size="sm">
                      <Code>{port.HostPort}</Code> → <Code>{port.container_port}</Code>
                      {port.protocol && <Text span c="dimmed"> ({port.protocol})</Text>}
                    </Text>
                  </div>
                ))}
              </SimpleGrid>
            </Card>
          )}

          {container.Mounts && container.Mounts.length > 0 && (
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Text fw={500} size="lg" mb="md">Mounts</Text>
              <Stack gap="md">
                {container.Mounts.map((mount, idx) => (
                  <div key={idx}>
                    <Text size="sm" c="dimmed">Type: {mount.type || 'bind'}</Text>
                    <Text size="sm">
                      <Code>{mount.source}</Code> → <Code>{mount.target}</Code>
                    </Text>
                  </div>
                ))}
              </Stack>
            </Card>
          )}

          {container.Labels && Object.keys(container.Labels).length > 0 && (
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Text fw={500} size="lg" mb="md">Labels</Text>
              <SimpleGrid cols={{ base: 1, md: 3 }}>
                {Object.entries(container.Labels).map(([key, value]) => (
                  <div key={key}>
                    <Text size="sm" c="dimmed">{key}</Text>
                    <Code block>{value}</Code>
                  </div>
                ))}
              </SimpleGrid>
            </Card>
          )}
        </Stack>
      )}

      {activeTab === 'logs' && (
        <ContainerLogs containerId={container.Id} />
      )}

      {activeTab === 'raw' && (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text fw={500} size="lg" mb="md">Raw Data</Text>
          <Code block>
            {JSON.stringify(container, null, 2)}
          </Code>
        </Card>
      )}

      {activeTab === 'shell' && (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text fw={500} size="lg" mb="md">Shell Access</Text>
          <Text c="dimmed">This feature is not implemented yet.</Text>
        </Card>
      )}
    </>
  );
}
