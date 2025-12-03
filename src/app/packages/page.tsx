'use client';

import { Container, Title, Text, Card, Stack } from '@mantine/core';

export default function PackagesPage() {
  return (
    <Container size="xl">
      <Stack gap="md">
        <div>
          <Title order={1}>Required Packages</Title>
          <Text c="dimmed" size="sm">
            Manage system packages and dependencies
          </Text>
        </div>

        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text c="dimmed" ta="center" py="xl">
            Package management functionality coming soon...
          </Text>
        </Card>
      </Stack>
    </Container>
  );
}
