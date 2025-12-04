import { getRequiredPackages } from '@/actions/packages';
import { PackageList } from '@/components/Packages/PackageList';
import { Container, Title, Text, Stack } from '@mantine/core';

export const dynamic = 'force-dynamic';

export default async function PackagesPage() {
  let packages: any[] = [];

  try {
    const response = await getRequiredPackages();
    packages = response.data || [];
  } catch (error) {
    console.error('Failed to fetch packages:', error);
  }

  return (
    <Container size="xl" py="xl">
      <Stack gap="md">
        <div>
          <Title order={1}>Required Packages</Title>
          <Text c="dimmed" size="sm">
            Manage system packages and dependencies
          </Text>
        </div>

        <PackageList initialPackages={packages} />
      </Stack>
    </Container>
  );
}