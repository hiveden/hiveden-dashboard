'use server';

import { fetchApi } from '@/lib/api';
import { revalidatePath } from 'next/cache';
import type { DataResponse, LXCContainerCreate, SuccessResponse } from '@/types/api';

export async function listLxcContainers(): Promise<DataResponse> {
  return fetchApi('/lxc/containers');
}

export async function createLxcContainer(container: LXCContainerCreate): Promise<DataResponse> {
  return fetchApi('/lxc/containers', {
    method: 'POST',
    body: JSON.stringify(container),
  });
}

export async function getLxcContainer(name: string): Promise<DataResponse> {
  return fetchApi(`/lxc/containers/${name}`);
}

export async function startLxcContainer(name: string): Promise<SuccessResponse> {
  const result = await fetchApi(`/lxc/containers/${name}/start`, { method: 'POST' });
  revalidatePath('/lxc');
  return result;
}

export async function stopLxcContainer(name: string): Promise<SuccessResponse> {
  const result = await fetchApi(`/lxc/containers/${name}/stop`, { method: 'POST' });
  revalidatePath('/lxc');
  return result;
}

export async function deleteLxcContainer(name: string): Promise<SuccessResponse> {
  const result = await fetchApi(`/lxc/containers/${name}`, { method: 'DELETE' });
  revalidatePath('/lxc');
  return result;
}
