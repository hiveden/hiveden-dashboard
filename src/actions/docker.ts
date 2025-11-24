'use server';

import { fetchApi } from '@/lib/api';
import { revalidatePath } from 'next/cache';
import type { DataResponse, DockerContainer, NetworkCreate, SuccessResponse } from '@/types/api';

export async function listContainers(): Promise<DataResponse> {
  return fetchApi('/docker/containers');
}

export async function createContainer(container: DockerContainer): Promise<DataResponse> {
  return fetchApi('/docker/containers', {
    method: 'POST',
    body: JSON.stringify(container),
  });
}

export async function getContainer(containerId: string): Promise<DataResponse> {
  return fetchApi(`/docker/containers/${containerId}`);
}

export async function stopContainer(containerId: string): Promise<DataResponse> {
  const result = await fetchApi(`/docker/containers/${containerId}/stop`, { method: 'POST' });
  revalidatePath('/docker');
  return result;
}

export async function removeContainer(containerId: string): Promise<SuccessResponse> {
  const result = await fetchApi(`/docker/containers/${containerId}`, { method: 'DELETE' });
  revalidatePath('/docker');
  return result;
}

export async function listNetworks(): Promise<DataResponse> {
  return fetchApi('/docker/networks');
}

export async function createNetwork(network: NetworkCreate): Promise<DataResponse> {
  return fetchApi('/docker/networks', {
    method: 'POST',
    body: JSON.stringify(network),
  });
}

export async function getNetwork(networkId: string): Promise<DataResponse> {
  return fetchApi(`/docker/networks/${networkId}`);
}

export async function removeNetwork(networkId: string): Promise<SuccessResponse> {
  const result = await fetchApi(`/docker/networks/${networkId}`, { method: 'DELETE' });
  revalidatePath('/docker');
  return result;
}
