'use server';

import '@/lib/api';
import { ConfigService } from '@/lib/client';
import type { DataResponse } from '@/lib/client';

export async function submitConfig(config: string): Promise<DataResponse> {
  return ConfigService.submitConfigConfigPost(config);
}