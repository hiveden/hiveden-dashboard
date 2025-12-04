'use client';

import { Container, Title, Text, Stack } from '@mantine/core';
import { ContainerForm } from '@/components/Docker/ContainerForm';

export default function NewContainerPage() {
  return (
    <Container size="xl" py="xl">
      <Stack gap="lg">
        <div>
          <Title order={2}>New Container</Title>
          <Text c="dimmed">Deploy a new Docker container or create a template.</Text>
        </div>
        <ContainerForm />
      </Stack>
    </Container>
  );
}
