'use server';

import '@/lib/api';
import { InfoService } from '@/lib/client';
import type { DataResponse } from '@/lib/client';

export async function getOsInfo(): Promise<DataResponse> {
  return InfoService.getOsInfoEndpointInfoOsGet();
}

export async function getHwInfo(): Promise<DataResponse> {
  return InfoService.getHwInfoEndpointInfoHwGet();
}

export async function getVersion(): Promise<DataResponse> {
  return InfoService.getVersionEndpointInfoVersionGet();
}