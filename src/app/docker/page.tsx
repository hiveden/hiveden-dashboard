import { listContainers } from '@/actions/docker';
import { DockerPageContent } from '@/components/Docker/DockerPageContent';

export default async function DockerPage() {
  const containers = await listContainers();

  return <DockerPageContent containers={containers.data || []} />;
}
