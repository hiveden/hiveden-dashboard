import { getHwInfo, getOsInfo } from '@/actions/info';
import { Card, Container, SimpleGrid, Text, Title, Group, ThemeIcon } from '@mantine/core';
import { IconCpu, IconDeviceDesktop } from '@tabler/icons-react';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const [osInfo, hwInfo] = await Promise.all([getOsInfo(), getHwInfo()]);

  return (
    <Container fluid>
      <Title order={2} mb="lg">System Overview</Title>
      
      <SimpleGrid cols={{ base: 1, md: 2 }}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group mb="xs">
            <ThemeIcon size="lg" variant="light" color="blue">
              <IconDeviceDesktop size={20} />
            </ThemeIcon>
            <Text fw={500} size="lg">OS Information</Text>
          </Group>
          
          <Text size="sm" c="dimmed">
            <pre>{JSON.stringify(osInfo.data, null, 2)}</pre>
          </Text>
        </Card>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Group mb="xs">
            <ThemeIcon size="lg" variant="light" color="green">
              <IconCpu size={20} />
            </ThemeIcon>
            <Text fw={500} size="lg">Hardware Information</Text>
          </Group>
          
          <Text size="sm" c="dimmed">
            {JSON.stringify(hwInfo.data, null, 2)}
          </Text>
        </Card>
      </SimpleGrid>
    </Container>
  );
}
