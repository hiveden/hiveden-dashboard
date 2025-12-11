'use server';

import { revalidatePath } from 'next/cache';
import '@/lib/api'; // Ensure client config
import { DockerService } from '@/lib/client';
import type { 
  DataResponse, 
  ContainerCreate, 
  NetworkCreate, 
  SuccessResponse,
  TemplateCreate,
  TemplateResponse,
  ContainerResponse
} from '@/lib/client';

export async function listContainers(): Promise<DataResponse> {
  return DockerService.listAllContainersDockerContainersGet();
}

export async function createContainer(container: ContainerCreate): Promise<DataResponse> {
  return DockerService.createNewContainerDockerContainersPost(container);
}

export async function createTemplate(template: TemplateCreate): Promise<TemplateResponse> {
  return DockerService.createTemplateDockerContainersTemplatePost(template);
}

export async function getContainer(containerId: string): Promise<DataResponse> {
  return DockerService.getOneContainerDockerContainersContainerIdGet(containerId);
}

export async function stopContainer(containerId: string): Promise<DataResponse> {
  const result = await DockerService.stopOneContainerDockerContainersContainerIdStopPost(containerId);
  revalidatePath('/docker');
  return result;
}

export async function startContainer(containerId: string): Promise<DataResponse> {
  const result = await DockerService.startOneContainerDockerContainersContainerIdStartPost(containerId);
  revalidatePath('/docker');
  return result;
}

export async function restartContainer(containerId: string): Promise<ContainerResponse> {
    const result = await DockerService.restartOneContainerDockerContainersContainerIdRestartPost(containerId);
    revalidatePath('/docker');
    return result;
}

export async function removeContainer(containerId: string): Promise<SuccessResponse> {
  const result = await DockerService.removeOneContainerDockerContainersContainerIdDelete(containerId);
  revalidatePath('/docker');
  return result;
}

export async function listNetworks(): Promise<DataResponse> {
  return DockerService.listAllNetworksDockerNetworksGet();
}

export async function createNetwork(network: NetworkCreate): Promise<DataResponse> {
  return DockerService.createNewNetworkDockerNetworksPost(network);
}

export async function getNetwork(networkId: string): Promise<DataResponse> {
  return DockerService.getOneNetworkDockerNetworksNetworkIdGet(networkId);
}

export async function removeNetwork(networkId: string): Promise<SuccessResponse> {
  const result = await DockerService.removeOneNetworkDockerNetworksNetworkIdDelete(networkId);
  revalidatePath('/docker');
  return result;
}