import { listContainers } from '@/actions/docker';
import { DockerPageContent } from '@/components/Docker/DockerPageContent';
import type { Container } from '@/lib/client';

export default async function DockerPage() {
  const containers = await listContainers();

  return <DockerPageContent containers={(containers.data as Container[]) || []} />;
}
