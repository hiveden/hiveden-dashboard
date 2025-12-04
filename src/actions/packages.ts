'use server';

import { fetchApi } from '@/lib/api';
import { DataResponse } from '@/types/api';

export async function getRequiredPackages(tags?: string): Promise<DataResponse> {
  const queryString = tags ? `?tags=${tags}` : '';
  return fetchApi(`/pkgs/required${queryString}`);
}
