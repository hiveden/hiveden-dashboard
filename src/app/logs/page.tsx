import { Container, Title, Text, Card, Stack } from '@mantine/core';

export default function LogsPage() {
  return (
    <Container fluid>
      <Title order={2} mb="lg">Logs</Title>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack align="center" gap="md" py="xl">
          <Text size="xl" fw={500} c="dimmed">
            Not implemented yet
          </Text>
          <Text size="sm" c="dimmed">
            This feature is coming soon
          </Text>
        </Stack>
      </Card>
    </Container>
  );
}
