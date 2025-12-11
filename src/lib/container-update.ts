import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ContainerCreate } from '@/lib/client';
import { updateContainerConfiguration } from '@/actions/docker';
import { ContainerFormState } from '@/hooks/useContainerForm';

export async function handleUpdateContainer(
  containerId: string,
  formData: ContainerFormState,
  labelsList: { key: string; value: string }[],
  router: AppRouterInstance,
  setLoading: (loading: boolean) => void
) {
  setLoading(true);
  try {
    const labelsRecord: Record<string, string> = {};
    labelsList.forEach(l => {
      if (l.key) labelsRecord[l.key] = l.value;
    });

    const commonData = { 
      ...formData, 
      labels: labelsRecord,
      command: formData.command.length > 0 ? formData.command : null 
    };
    
    const payload: ContainerCreate = {
      ...commonData,
      is_container: true,
    };
    await updateContainerConfiguration(containerId, payload);
    
    router.push('/docker');
    router.refresh();

  } catch (error) {
    alert(`Failed to update container: ${(error as Error).message}`);
  } finally {
    setLoading(false);
  }
}
