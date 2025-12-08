'use client';

import type { PackageStatus } from '@/lib/client';
import { Alert, Button, Group, List, Text, ThemeIcon } from '@mantine/core';
import { IconAlertCircle, IconTool } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

interface PrerequisitesBannerProps {
  packages: PackageStatus[];
}

export function PrerequisitesBanner({ packages }: PrerequisitesBannerProps) {
  const router = useRouter();
  const missingPackages = packages.filter((pkg) => !pkg.installed);

  if (missingPackages.length === 0) {
    return null;
  }

  const handleInstall = () => {
    router.push('/packages');
  };

  return (
    <Alert 
      variant="light" 
      color="red" 
      title="Storage Tools Missing" 
      icon={<IconAlertCircle />}
      mb="lg"
    >
      <Group justify="space-between" align="flex-start">
        <div>
          <Text size="sm" mb="xs">
            The following dependencies are required to manage storage pools:
          </Text>
          <List size="sm" spacing={4} center icon={
             <ThemeIcon color="red" size={16} radius="xl">
                <IconTool size={10} />
             </ThemeIcon>
          }>
            {missingPackages.map((pkg) => (
              <List.Item key={pkg.name}>
                <Text span fw={500}>{pkg.name}</Text> - {pkg.description || 'System tool'}
              </List.Item>
            ))}
          </List>
        </div>
        <Button color="red" variant="outline" size="xs" onClick={handleInstall}>
          Install Dependencies
        </Button>
      </Group>
    </Alert>
  );
}
