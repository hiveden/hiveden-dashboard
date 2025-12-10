import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { ContainerCreate, TemplateCreate } from '@/lib/client';
import { createContainer, createTemplate } from '@/actions/docker';
import { ContainerFormState } from '@/hooks/useContainerForm';

export async function handleCreateContainer(
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
    await createContainer(payload);
    
    router.push('/docker');
    router.refresh();

  } catch (error) {
    alert(`Failed to create container: ${(error as Error).message}`);
  } finally {
    setLoading(false);
  }
}

export async function handleCreateTemplate(
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

    const payload: TemplateCreate = {
      ...commonData,
      is_container: false,
      type: 'template'
    };
    await createTemplate(payload);
    
    router.push('/docker');
    router.refresh(); 

  } catch (error) {
    alert(`Failed to save template: ${(error as Error).message}`);
  } finally {
    setLoading(false);
  }
}
