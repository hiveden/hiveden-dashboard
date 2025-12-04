'use server';

import { fetchApi } from '@/lib/api';
import type { DataResponse } from '@/types/api';

export async function listStorageDevices(): Promise<DataResponse> {
  return fetchApi('/storage/devices');
}

export async function listStorageStrategies(): Promise<DataResponse> {
  return fetchApi('/storage/strategies');
}

export async function checkRequiredPackages(): Promise<DataResponse> {
  return fetchApi('/pkgs/required');
}
