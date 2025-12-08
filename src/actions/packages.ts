'use server';

import '@/lib/api';
import { PackagesService } from '@/lib/client';
import { DataResponse } from '@/lib/client';

export async function getRequiredPackages(tags?: string): Promise<DataResponse> {
  return PackagesService.listRequiredPackagesPkgsRequiredGet(tags);
}