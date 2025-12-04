'use client';

import { useState, useEffect, useCallback } from 'react';
import { Disk, PackageStatus, StorageStrategy } from '@/types/api';
import { listStorageDevices, listStorageStrategies } from '@/actions/storage';
import { Container, Title, Text, Tabs, Button, Group, Stack, Modal, LoadingOverlay } from '@mantine/core';
import { useInterval } from '@mantine/hooks';
import { IconDatabase, IconShare } from '@tabler/icons-react';
import { DiskInventory } from './DiskInventory';
import { StrategyWizard } from './StrategyWizard';
import { PrerequisitesBanner } from './PrerequisitesBanner';

interface StoragePageContentProps {
  initialDisks: Disk[];
  initialPackages: PackageStatus[];
}

export function StoragePageContent({ initialDisks, initialPackages }: StoragePageContentProps) {
  const [disks, setDisks] = useState<Disk[]>(initialDisks);
  const [strategies, setStrategies] = useState<StorageStrategy[]>([]);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [loadingStrategies, setLoadingStrategies] = useState(false);
  
  // Polling for disk updates
  const refreshDisks = useCallback(async () => {
    try {
      const response = await listStorageDevices();
      if (response.data) {
        setDisks(response.data);
      }
    } catch (error) {
      console.error('Failed to refresh disks:', error);
    }
  }, []);

  const { start, stop } = useInterval(refreshDisks, 30000);

  useEffect(() => {
    start();
    return stop;
  }, [start, stop]);

  const handleCreatePool = async () => {
    setLoadingStrategies(true);
    setIsWizardOpen(true);
    try {
      const response = await listStorageStrategies();
      if (response.data) {
        setStrategies(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch strategies:', error);
    } finally {
      setLoadingStrategies(false);
    }
  };

  const handleStrategySelect = (strategy: StorageStrategy) => {
    console.log('Selected strategy:', strategy);
    // TODO: Implement apply strategy endpoint
    setIsWizardOpen(false);
  };

  return (
    <Container size="xl" py="xl">
      <Stack gap="lg">
        <div>
          <Title order={1}>Storage</Title>
          <Text c="dimmed">Manage physical disks, storage pools, and shares</Text>
        </div>

        <PrerequisitesBanner packages={initialPackages} />

        <Tabs defaultValue="disks">
          <Tabs.List>
            <Tabs.Tab value="disks" leftSection={<IconDatabase size={16} />}>
              Disks & Pools
            </Tabs.Tab>
            <Tabs.Tab value="shares" leftSection={<IconShare size={16} />}>
              Shares
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="disks" pt="md">
            <Stack gap="lg">
              <Group justify="space-between" align="center">
                <Title order={3}>Physical Disks</Title>
                <Button onClick={handleCreatePool}>Create Storage Pool</Button>
              </Group>
              
              <DiskInventory disks={disks} />
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="shares" pt="md">
            <Stack gap="md">
               <Title order={3}>Shared Folders</Title>
               <Text c="dimmed">
                 Share management functionality will be available once storage pools are configured.
               </Text>
            </Stack>
          </Tabs.Panel>
        </Tabs>
      </Stack>

      <Modal 
        opened={isWizardOpen} 
        onClose={() => setIsWizardOpen(false)}
        title="Create New Storage Pool"
        size="xl"
      >
        <div style={{ position: 'relative', minHeight: 200 }}>
            <LoadingOverlay visible={loadingStrategies} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
            {!loadingStrategies && (
                <StrategyWizard 
                    strategies={strategies} 
                    onSelect={handleStrategySelect} 
                />
            )}
        </div>
      </Modal>
    </Container>
  );
}
