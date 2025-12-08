'use server';

import '@/lib/api';
import { StorageService, SharesService, PackagesService } from '@/lib/client';
import type { DataResponse, StorageStrategy, CreateBtrfsShareRequest } from '@/lib/client';

export async function listStorageDevices(): Promise<DataResponse> {
  return StorageService.listDevicesStorageDevicesGet();
}

export async function listStorageStrategies(): Promise<DataResponse> {
  return StorageService.listStrategiesStorageStrategiesGet();
}

export async function getDiskDetails(deviceName: string): Promise<DataResponse> {
  return StorageService.getDeviceDetailsStorageDevicesDeviceNameGet(deviceName);
}

export async function listBtrfsVolumes(): Promise<DataResponse> {
  return SharesService.listBtrfsVolumesEndpointSharesBtrfsVolumesGet();
}

export async function listBtrfsShares(): Promise<DataResponse> {
  return SharesService.listBtrfsSharesEndpointSharesBtrfsSharesGet();
}

export async function createBtrfsShare(data: CreateBtrfsShareRequest): Promise<DataResponse> {
  return SharesService.createBtrfsShareEndpointSharesBtrfsSharesPost(data);
}

export async function applyStorageStrategy(strategy: StorageStrategy): Promise<DataResponse> {
  return StorageService.applyStrategyStorageApplyPost(strategy);
}

export async function checkRequiredPackages(): Promise<DataResponse> {
  return PackagesService.listRequiredPackagesPkgsRequiredGet();
}