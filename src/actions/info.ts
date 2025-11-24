'use server';

import { fetchApi } from '@/lib/api';
import type { DataResponse } from '@/types/api';

export async function getOsInfo(): Promise<DataResponse> {
  return fetchApi('/info/os');
}

export async function getHwInfo(): Promise<DataResponse> {
  return fetchApi('/info/hw');
}
