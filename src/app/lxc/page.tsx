import { listLxcContainers } from '@/actions/lxc';
import { LXCList } from '@/components/LXC/LXCList';
import { Container, Title } from '@mantine/core';

export default async function LXCPage() {
  const containers = await listLxcContainers();

  return (
    <Container fluid>
      <Title order={2} mb="lg">LXC Containers</Title>
      <LXCList containers={containers.data || []} />
    </Container>
  );
}
