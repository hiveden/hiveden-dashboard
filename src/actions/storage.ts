'use server';

import { fetchApi } from '@/lib/api';
import type { DataResponse, StorageStrategy, ApplyStrategyResponse } from '@/types/api';

export async function listStorageDevices(): Promise<DataResponse> {
  return fetchApi('/storage/devices');
}

export async function listStorageStrategies(): Promise<DataResponse> {
  return fetchApi('/storage/strategies');
}

export async function getDiskDetails(deviceName: string): Promise<DataResponse> {
  return fetchApi(`/storage/devices/${deviceName}`);
}

export async function applyStorageStrategy(strategy: StorageStrategy): Promise<DataResponse<ApplyStrategyResponse>> {
  return fetchApi('/storage/apply', {
    method: 'POST',
    body: JSON.stringify(strategy),
  });
}

export async function checkRequiredPackages(): Promise<DataResponse> {
  return fetchApi('/pkgs/required');
}
