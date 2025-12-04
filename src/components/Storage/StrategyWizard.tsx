'use client';

import { StorageStrategy } from '@/types/api';
import { formatBytes } from '@/lib/format';
import { Card, Text, Button, SimpleGrid, Stack, Group, ThemeIcon, Badge } from '@mantine/core';
import { IconDatabase, IconShieldCheck, IconAlertTriangle } from '@tabler/icons-react';

interface StrategyWizardProps {
  strategies: StorageStrategy[];
  onSelect: (strategy: StorageStrategy) => void;
}

export function StrategyWizard({ strategies, onSelect }: StrategyWizardProps) {
  if (strategies.length === 0) {
    return (
      <Card withBorder padding="xl" radius="md">
        <Stack align="center" gap="md">
          <ThemeIcon size={48} radius="xl" color="yellow" variant="light">
            <IconAlertTriangle size={24} />
          </ThemeIcon>
          <Text size="lg" fw={500}>No Storage Strategies Available</Text>
          <Text c="dimmed" ta="center" maw={400}>
            No available disks found. Please add unpartitioned drives to the server to create a new storage pool.
          </Text>
        </Stack>
      </Card>
    );
  }

  return (
    <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
      {strategies.map((strategy) => (
        <StrategyCard 
          key={strategy.name} 
          strategy={strategy} 
          onSelect={() => onSelect(strategy)} 
        />
      ))}
    </SimpleGrid>
  );
}

function StrategyCard({ strategy, onSelect }: { strategy: StorageStrategy; onSelect: () => void }) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" mb="md">
        <Group gap="xs">
          <ThemeIcon color="blue" variant="light">
            <IconDatabase size={16} />
          </ThemeIcon>
          <Text fw={500}>{strategy.name}</Text>
        </Group>
        <Badge color="blue" variant="light">{strategy.raid_level.toUpperCase()}</Badge>
      </Group>

      <Text size="sm" c="dimmed" mb="lg" mih={40}>
        {strategy.description}
      </Text>

      <Stack gap="xs" mb="xl">
        <Group justify="space-between">
          <Group gap="xs">
            <IconDatabase size={16} style={{ opacity: 0.7 }} />
            <Text size="sm">Usable Capacity</Text>
          </Group>
          <Text size="sm" fw={500}>{formatBytes(strategy.usable_capacity)}</Text>
        </Group>

        <Group justify="space-between">
          <Group gap="xs">
            <IconShieldCheck size={16} style={{ opacity: 0.7 }} />
            <Text size="sm">Redundancy</Text>
          </Group>
          <Text size="sm" fw={500} maw={200} ta="right" lh={1.2}>
            {strategy.redundancy}
          </Text>
        </Group>

        <Group justify="space-between" align="flex-start">
            <Text size="sm">Disks Involved</Text>
            <Stack gap={2} align="flex-end">
                {strategy.disks.map(d => (
                    <Text key={d} size="xs" c="dimmed">{d}</Text>
                ))}
            </Stack>
        </Group>
      </Stack>

      <Button fullWidth onClick={onSelect}>
        Select Strategy
      </Button>
    </Card>
  );
}
