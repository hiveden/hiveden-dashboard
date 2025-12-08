'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  TextInput, 
  Button, 
  Group, 
  Box, 
  Text, 
  Stack, 
  Switch, 
  ActionIcon, 
  NumberInput, 
  Select, 
  Paper, 
  Title,
  LoadingOverlay
} from '@mantine/core';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { createContainer } from '@/actions/docker';
import { ContainerCreateRequest, CreateEnvVar, CreatePort, CreateMount } from '@/types/api';

export function ContainerForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState<ContainerCreateRequest>({
    name: '',
    image: '',
    command: '',
    env: [],
    ports: [],
    mounts: [],
    labels: {},
    is_container: true,
    enabled: true,
    type: 'docker'
  });

  // Helper to update simple fields
  const handleChange = (field: keyof ContainerCreateRequest, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Dynamic List Helpers
  const addEnv = () => {
    setFormData(prev => ({ ...prev, env: [...(prev.env || []), { name: '', value: '' }] }));
  };

  const removeEnv = (index: number) => {
    setFormData(prev => ({ ...prev, env: (prev.env || []).filter((_, i) => i !== index) }));
  };

  const updateEnv = (index: number, field: keyof CreateEnvVar, value: string) => {
    setFormData(prev => {
      const newEnv = [...(prev.env || [])];
      newEnv[index] = { ...newEnv[index], [field]: value };
      return { ...prev, env: newEnv };
    });
  };

  const addPort = () => {
    setFormData(prev => ({ ...prev, ports: [...(prev.ports || []), { host_port: 0, container_port: 0, protocol: 'tcp' }] }));
  };

  const removePort = (index: number) => {
    setFormData(prev => ({ ...prev, ports: (prev.ports || []).filter((_, i) => i !== index) }));
  };

  const updatePort = (index: number, field: keyof CreatePort, value: unknown) => {
    setFormData(prev => {
      const newPorts = [...(prev.ports || [])];
      newPorts[index] = { ...newPorts[index], [field]: value };
      return { ...prev, ports: newPorts };
    });
  };

  const addMount = () => {
    setFormData(prev => ({ ...prev, mounts: [...(prev.mounts || []), { source: '', target: '', type: 'bind' }] }));
  };

  const removeMount = (index: number) => {
    setFormData(prev => ({ ...prev, mounts: (prev.mounts || []).filter((_, i) => i !== index) }));
  };

  const updateMount = (index: number, field: keyof CreateMount, value: unknown) => {
    setFormData(prev => {
      const newMounts = [...(prev.mounts || [])];
      newMounts[index] = { ...newMounts[index], [field]: value };
      return { ...prev, mounts: newMounts };
    });
  };

  // Handle Labels separately since it's a Record<string, string>
  // We'll manage it as an array of objects locally for the UI
  const [labelsList, setLabelsList] = useState<{ key: string; value: string }[]>([]);

  const addLabel = () => {
    setLabelsList(prev => [...prev, { key: '', value: '' }]);
  };

  const removeLabel = (index: number) => {
    setLabelsList(prev => prev.filter((_, i) => i !== index));
  };

  const updateLabel = (index: number, field: 'key' | 'value', value: string) => {
    setLabelsList(prev => {
      const newLabels = [...prev];
      newLabels[index] = { ...newLabels[index], [field]: value };
      return newLabels;
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Convert labelsList back to Record
      const labelsRecord: Record<string, string> = {};
      labelsList.forEach(l => {
        if (l.key) labelsRecord[l.key] = l.value;
      });

      const payload = { ...formData, labels: labelsRecord };
      
      const response = await createContainer(payload);
      
      // Currently actions return { status: 'success' | 'error', ... }
      // If the response is generic DataResponse, we check status if possible, 
      // or rely on fetchApi throwing errors (which it does in lib/api.ts if !ok).
      // However, fetchApi returns json(). If backend returns 200 but status: error, we handle it.
      
      if (response.status === 'success' || !response.status) {
          // Assuming success if no status or status success
           router.push('/docker');
      } else {
          alert(`Error: ${response.message}`);
      }

    } catch (error) {
      alert(`Failed to create container: ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box pos="relative">
      <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
      
      <Stack gap="lg">
        <Paper p="md" withBorder radius="md">
            <Group justify="space-between" mb="md">
                <Title order={4}>General Configuration</Title>
                <Switch 
                    label={formData.is_container ? "Action: Run Container" : "Action: Save Template Only"} 
                    checked={formData.is_container}
                    onChange={(event) => handleChange('is_container', event.currentTarget.checked)}
                    size="md"
                    color="blue"
                />
            </Group>
            <SimpleGridWrapper>
                <TextInput 
                    label="Name" 
                    placeholder="my-container" 
                    required 
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                />
                <TextInput 
                    label="Image" 
                    placeholder="nginx:latest" 
                    required 
                    value={formData.image}
                    onChange={(e) => handleChange('image', e.target.value)}
                />
            </SimpleGridWrapper>
            <TextInput 
                mt="md"
                label="Command" 
                placeholder="/bin/sh -c 'echo hello'" 
                value={formData.command}
                onChange={(e) => handleChange('command', e.target.value)}
            />
        </Paper>

        <Paper p="md" withBorder radius="md">
            <Title order={4} mb="md">Environment Variables</Title>
            <Stack>
                {formData.env?.map((env, index) => (
                    <Group key={index} grow preventGrowOverflow={false} wrap="nowrap">
                        <TextInput 
                            placeholder="Key" 
                            value={env.name}
                            onChange={(e) => updateEnv(index, 'name', e.target.value)}
                        />
                        <TextInput 
                            placeholder="Value" 
                            value={env.value}
                            onChange={(e) => updateEnv(index, 'value', e.target.value)}
                        />
                        <ActionIcon color="red" variant="subtle" onClick={() => removeEnv(index)}>
                            <IconTrash size={16} />
                        </ActionIcon>
                    </Group>
                ))}
                <Button variant="light" leftSection={<IconPlus size={16} />} onClick={addEnv} size="xs" w="max-content">
                    Add Variable
                </Button>
            </Stack>
        </Paper>

        <Paper p="md" withBorder radius="md">
            <Title order={4} mb="md">Port Forwarding</Title>
            <Stack>
                {formData.ports?.map((port, index) => (
                    <Group key={index} grow preventGrowOverflow={false} wrap="nowrap">
                        <NumberInput 
                            placeholder="Host Port" 
                            value={port.host_port}
                            onChange={(val) => updatePort(index, 'host_port', val)}
                            min={1} max={65535}
                        />
                        <NumberInput 
                            placeholder="Container Port" 
                            value={port.container_port}
                            onChange={(val) => updatePort(index, 'container_port', val)}
                            min={1} max={65535}
                        />
                         <Select
                            value={port.protocol}
                            onChange={(val) => updatePort(index, 'protocol', val)}
                            data={['tcp', 'udp']}
                            allowDeselect={false}
                        />
                        <ActionIcon color="red" variant="subtle" onClick={() => removePort(index)}>
                            <IconTrash size={16} />
                        </ActionIcon>
                    </Group>
                ))}
                <Button variant="light" leftSection={<IconPlus size={16} />} onClick={addPort} size="xs" w="max-content">
                    Add Port Mapping
                </Button>
            </Stack>
        </Paper>

        <Paper p="md" withBorder radius="md">
            <Title order={4} mb="md">Volumes & Mounts</Title>
            <Stack>
                {formData.mounts?.map((mount, index) => (
                    <Group key={index} grow preventGrowOverflow={false} wrap="nowrap">
                        <TextInput 
                            placeholder="Source Path (Host)" 
                            value={mount.source}
                            onChange={(e) => updateMount(index, 'source', e.target.value)}
                        />
                        <TextInput 
                            placeholder="Target Path (Container)" 
                            value={mount.target}
                            onChange={(e) => updateMount(index, 'target', e.target.value)}
                        />
                         <Select
                            value={mount.type}
                            onChange={(val) => updateMount(index, 'type', val)}
                            data={['bind', 'volume']}
                            allowDeselect={false}
                        />
                        <ActionIcon color="red" variant="subtle" onClick={() => removeMount(index)}>
                            <IconTrash size={16} />
                        </ActionIcon>
                    </Group>
                ))}
                <Button variant="light" leftSection={<IconPlus size={16} />} onClick={addMount} size="xs" w="max-content">
                    Add Mount
                </Button>
            </Stack>
        </Paper>

        <Paper p="md" withBorder radius="md">
            <Title order={4} mb="md">Labels</Title>
            <Stack>
                {labelsList.map((label, index) => (
                    <Group key={index} grow preventGrowOverflow={false} wrap="nowrap">
                        <TextInput 
                            placeholder="Key" 
                            value={label.key}
                            onChange={(e) => updateLabel(index, 'key', e.target.value)}
                        />
                        <TextInput 
                            placeholder="Value" 
                            value={label.value}
                            onChange={(e) => updateLabel(index, 'value', e.target.value)}
                        />
                        <ActionIcon color="red" variant="subtle" onClick={() => removeLabel(index)}>
                            <IconTrash size={16} />
                        </ActionIcon>
                    </Group>
                ))}
                <Button variant="light" leftSection={<IconPlus size={16} />} onClick={addLabel} size="xs" w="max-content">
                    Add Label
                </Button>
            </Stack>
        </Paper>

        <Group justify="flex-end" mt="xl">
             <Button variant="default" onClick={() => router.back()}>Cancel</Button>
             <Button onClick={handleSubmit} loading={loading}>
                 {formData.is_container ? 'Deploy Container' : 'Save Template'}
             </Button>
        </Group>

      </Stack>
    </Box>
  );
}

function SimpleGridWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--mantine-spacing-md)' }}>
            {children}
        </div>
    )
}
