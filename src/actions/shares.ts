'use server';

import { fetchApi } from '@/lib/api';
import { revalidatePath } from 'next/cache';
import type { 
  DataResponse, 
  SMBShareCreate, 
  ZFSPoolCreate, 
  ZFSDatasetCreate,
  SuccessResponse 
} from '@/types/api';

export async function listZfsPools(): Promise<DataResponse> {
  return fetchApi('/shares/zfs/pools');
}

export async function createZfsPool(pool: ZFSPoolCreate): Promise<SuccessResponse> {
  const result = await fetchApi('/shares/zfs/pools', {
    method: 'POST',
    body: JSON.stringify(pool),
  });
  revalidatePath('/shares');
  return result;
}

export async function destroyZfsPool(name: string): Promise<SuccessResponse> {
  const result = await fetchApi(`/shares/zfs/pools/${name}`, { method: 'DELETE' });
  revalidatePath('/shares');
  return result;
}

export async function listZfsDatasets(pool: string): Promise<DataResponse> {
  return fetchApi(`/shares/zfs/datasets/${pool}`);
}

export async function createZfsDataset(dataset: ZFSDatasetCreate): Promise<SuccessResponse> {
  const result = await fetchApi('/shares/zfs/datasets', {
    method: 'POST',
    body: JSON.stringify(dataset),
  });
  revalidatePath('/shares');
  return result;
}

export async function destroyZfsDataset(name: string): Promise<SuccessResponse> {
  const result = await fetchApi(`/shares/zfs/datasets/${name}`, { method: 'DELETE' });
  revalidatePath('/shares');
  return result;
}

export async function listAvailableDevices(): Promise<DataResponse> {
  return fetchApi('/shares/zfs/available-devices');
}

export async function listSmbShares(): Promise<DataResponse> {
  return fetchApi('/shares/smb');
}

export async function createSmbShare(share: SMBShareCreate): Promise<SuccessResponse> {
  const result = await fetchApi('/shares/smb', {
    method: 'POST',
    body: JSON.stringify(share),
  });
  revalidatePath('/shares');
  return result;
}

export async function deleteSmbShare(name: string): Promise<SuccessResponse> {
  const result = await fetchApi(`/shares/smb/${name}`, { method: 'DELETE' });
  revalidatePath('/shares');
  return result;
}
