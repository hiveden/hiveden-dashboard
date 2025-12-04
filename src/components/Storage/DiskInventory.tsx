'use client';

import { Disk, Partition } from '@/types/api';
import { formatBytes } from '@/lib/format';
import { Card, Text, Group, Badge, Progress, SimpleGrid, Stack, ThemeIcon, Code } from '@mantine/core';
import { IconDatabase, IconDeviceFloppy } from '@tabler/icons-react';

interface DiskInventoryProps {
  disks: Disk[];
}

export function DiskInventory({ disks }: DiskInventoryProps) {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
      {disks.map((disk) => (
        <DiskCard key={disk.path} disk={disk} />
      ))}
    </SimpleGrid>
  );
}

function DiskCard({ disk }: { disk: Disk }) {
  const totalSize = disk.size;
  const usedSize = disk.partitions.reduce((acc, part) => acc + part.size, 0);
  const usedPercentage = totalSize > 0 ? (usedSize / totalSize) * 100 : 0;

  const Icon = disk.rotational ? IconDatabase : IconDeviceFloppy;

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section withBorder inheritPadding py="xs">
        <Group justify="space-between">
          <Group gap="xs">
            <ThemeIcon color="blue" variant="light">
              <Icon size={16} />
            </ThemeIcon>
            <Text fw={500}>{disk.name}</Text>
          </Group>
          <Group gap="xs">
            {disk.is_system && <Badge color="red">OS Drive</Badge>}
            {disk.available && <Badge color="green">Unused</Badge>}
            {!disk.available && !disk.is_system && <Badge color="gray">In Use</Badge>}
          </Group>
        </Group>
      </Card.Section>

      <Stack mt="md" gap="xs">
        <Group justify="space-between">
          <Text size="sm" c="dimmed">Model</Text>
          <Text size="sm" fw={500}>{disk.model || 'Unknown'}</Text>
        </Group>
        <Group justify="space-between">
          <Text size="sm" c="dimmed">Serial</Text>
          <Text size="sm" fw={500}>{disk.serial || 'Unknown'}</Text>
        </Group>
        <Group justify="space-between">
          <Text size="sm" c="dimmed">Size</Text>
          <Text size="sm" fw={500}>{formatBytes(disk.size)}</Text>
        </Group>
        <Group justify="space-between">
          <Text size="sm" c="dimmed">Path</Text>
          <Code>{disk.path}</Code>
        </Group>

        <Stack gap={4} mt="sm">
          <Group justify="space-between">
            <Text size="xs" c="dimmed">Allocated Space</Text>
            <Text size="xs" c="dimmed">{usedPercentage.toFixed(1)}%</Text>
          </Group>
          <Progress 
            value={usedPercentage} 
            color={usedPercentage > 90 ? 'red' : 'blue'} 
            size="sm" 
          />
        </Stack>

        {disk.partitions.length > 0 && (
          <Stack gap={4} mt="xs">
            <Text size="xs" c="dimmed" fw={600}>Partitions</Text>
            {disk.partitions.map(part => (
               <Group key={part.path} justify="space-between">
                 <Text size="xs">{part.name}</Text>
                 <Text size="xs" c="dimmed">
                    {formatBytes(part.size)} {part.fstype ? `(${part.fstype})` : ''}
                 </Text>
               </Group>
            ))}
          </Stack>
        )}
      </Stack>
    </Card>
  );
}
