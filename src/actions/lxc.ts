'use server';

import { revalidatePath } from 'next/cache';
import '@/lib/api';
import { LxcService } from '@/lib/client';
import type { DataResponse, LXCContainerCreate, SuccessResponse } from '@/lib/client';

export async function listLxcContainers(): Promise<DataResponse> {
  return LxcService.listLxcContainersEndpointLxcContainersGet();
}

export async function createLxcContainer(container: LXCContainerCreate): Promise<DataResponse> {
  return LxcService.createLxcContainerEndpointLxcContainersPost(container);
}

export async function getLxcContainer(name: string): Promise<DataResponse> {
  return LxcService.getLxcContainerEndpointLxcContainersNameGet(name);
}

export async function startLxcContainer(name: string): Promise<SuccessResponse> {
  const result = await LxcService.startLxcContainerEndpointLxcContainersNameStartPost(name);
  revalidatePath('/lxc');
  return result;
}

export async function stopLxcContainer(name: string): Promise<SuccessResponse> {
  const result = await LxcService.stopLxcContainerEndpointLxcContainersNameStopPost(name);
  revalidatePath('/lxc');
  return result;
}

export async function deleteLxcContainer(name: string): Promise<SuccessResponse> {
  const result = await LxcService.deleteLxcContainerEndpointLxcContainersNameDelete(name);
  revalidatePath('/lxc');
  return result;
}