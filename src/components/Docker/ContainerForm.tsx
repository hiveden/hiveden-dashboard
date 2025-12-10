import { 
  TextInput, 
  Button, 
  Group, 
  Box, 
  Stack, 
  ActionIcon, 
  NumberInput, 
  Select, 
  Paper, 
  Title,
} from '@mantine/core';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { UseContainerFormReturn } from '@/hooks/useContainerForm';

interface ContainerFormProps {
  form: UseContainerFormReturn;
}

export function ContainerForm({ form }: ContainerFormProps) {
  const { 
    formData, 
    labelsList,
    handleChange,
    addCommandArg,
    removeCommandArg,
    updateCommandArg,
    addEnv,
    removeEnv,
    updateEnv,
    addPort,
    removePort,
    updatePort,
    addMount,
    removeMount,
    updateMount,
    addLabel,
    removeLabel,
    updateLabel
  } = form;

  return (
    <Box pos="relative">
      <Stack gap="lg">
        <Paper p="md" withBorder radius="md">
            <Group justify="space-between" mb="md">
                <Title order={4}>General Configuration</Title>
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
        </Paper>

        <Paper p="md" withBorder radius="md">
            <Title order={4} mb="md">Command & Arguments</Title>
            <Stack>
                {formData.command.map((arg, index) => (
                    <Group key={index} grow preventGrowOverflow={false} wrap="nowrap">
                        <TextInput 
                            placeholder={`Argument ${index + 1}`} 
                            value={arg}
                            onChange={(e) => updateCommandArg(index, e.target.value)}
                        />
                        <ActionIcon color="red" variant="subtle" onClick={() => removeCommandArg(index)}>
                            <IconTrash size={16} />
                        </ActionIcon>
                    </Group>
                ))}
                <Button variant="light" leftSection={<IconPlus size={16} />} onClick={addCommandArg} size="xs" w="max-content">
                    Add Argument
                </Button>
            </Stack>
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