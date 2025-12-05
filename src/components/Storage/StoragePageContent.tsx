'use client';

import { useState, useEffect, useCallback } from 'react';
import { Disk, PackageStatus, StorageStrategy } from '@/types/api';
import { listStorageDevices, listStorageStrategies, applyStorageStrategy } from '@/actions/storage';
import { Container, Title, Text, Tabs, Button, Group, Stack, Modal, LoadingOverlay, Alert } from '@mantine/core';
import { useInterval } from '@mantine/hooks';
import { IconDatabase, IconShare, IconAlertTriangle } from '@tabler/icons-react';
import { DiskInventory } from './DiskInventory';
import { StrategyWizard } from './StrategyWizard';
import { PrerequisitesBanner } from './PrerequisitesBanner';
import { Terminal } from '@/components/Terminal/Terminal';

interface StoragePageContentProps {
  initialDisks: Disk[];
  initialPackages: PackageStatus[];
}

export function StoragePageContent({ initialDisks, initialPackages }: StoragePageContentProps) {
  const [disks, setDisks] = useState<Disk[]>(initialDisks);
  const [strategies, setStrategies] = useState<StorageStrategy[]>([]);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [loadingStrategies, setLoadingStrategies] = useState(false);
  
  // Application Flow State
  const [selectedStrategy, setSelectedStrategy] = useState<StorageStrategy | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [jobId, setJobId] = useState<string | null>(null);
  
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
    setSelectedStrategy(strategy);
    setIsWizardOpen(false); // Close wizard
    setIsConfirmOpen(true); // Open confirmation
  };

  const handleConfirmApply = async () => {
    if (!selectedStrategy) return;
    
    setIsConfirmOpen(false);
    
    try {
      const response = await applyStorageStrategy(selectedStrategy);
      if (response.data && response.data.job_id) {
        setJobId(response.data.job_id);
        setIsTerminalOpen(true);
      }
    } catch (error) {
      console.error('Failed to apply strategy:', error);
      // Ideally show error notification here
    }
  };

  const socketFactory = useCallback(() => {
    if (!jobId) return new WebSocket('ws://localhost:8000'); // Fallback
    
    // Construct WebSocket URL using ShellService logic (or manually)
    // Assuming ShellService base URL logic is consistent
    // We need to access private wsUrl or reconstruct it. 
    // Let's use the public baseUrl and replace protocol.
    const wsUrl = 'ws://localhost:8000'; // Hardcoded for now as in ShellService default
    const ws = new WebSocket(`${wsUrl}/shell/ws/jobs/${jobId}`);
    
    ws.addEventListener('message', (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.type === 'job_completed') {
           // Refresh disks when job is done
           setTimeout(() => {
             refreshDisks();
           }, 2000);
        }
      } catch {
        // ignore
      }
    });
    
    return ws;
  }, [jobId, refreshDisks]);

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

      {/* Wizard Modal */}
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

      {/* Confirmation Modal */}
      <Modal
        opened={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        title="Confirm Storage Configuration"
        size="md"
      >
        <Stack gap="md">
          <Alert color="red" icon={<IconAlertTriangle />}>
            Warning: This action will erase ALL data on the selected disks.
          </Alert>
          
          {selectedStrategy && (
            <Stack gap="xs">
              <Text fw={500}>{selectedStrategy.name}</Text>
              <Text size="sm">The following disks will be formatted:</Text>
              <Stack gap={4} pl="md">
                {selectedStrategy.disks.map(d => (
                  <Text key={d} size="xs" ff="monospace">{d}</Text>
                ))}
              </Stack>
            </Stack>
          )}

          <Group justify="flex-end" mt="md">
            <Button variant="light" color="gray" onClick={() => setIsConfirmOpen(false)}>
              Cancel
            </Button>
            <Button color="red" onClick={handleConfirmApply}>
              I Understand, Apply Configuration
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* Terminal/Progress Modal */}
      <Modal
        opened={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        title="Applying Storage Configuration"
        size="xl"
        closeOnClickOutside={false}
      >
        <Terminal 
          title="Configuration Log"
          socketFactory={socketFactory}
          onClose={() => setIsTerminalOpen(false)}
        />
      </Modal>
    </Container>
  );
}
