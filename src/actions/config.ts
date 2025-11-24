'use server';

import { fetchApi } from '@/lib/api';
import type { DataResponse } from '@/types/api';

export async function submitConfig(config: string): Promise<DataResponse> {
  return fetchApi('/config', {
    method: 'POST',
    body: JSON.stringify(config),
  });
}
