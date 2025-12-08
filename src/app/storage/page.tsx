import { listStorageDevices } from '@/actions/storage';
import { getRequiredPackages } from '@/actions/packages';
import { StoragePageContent } from '@/components/Storage/StoragePageContent';
import type { Disk, PackageStatus } from '@/lib/client';

export const dynamic = 'force-dynamic';

export default async function StoragePage() {
  let disks: Disk[] = [];
  let packages: PackageStatus[] = [];

  try {
    const [disksRes, pkgsRes] = await Promise.all([
      listStorageDevices(),
      getRequiredPackages('storage')
    ]);

    disks = (disksRes.data as Disk[]) || [];
    packages = (pkgsRes.data as PackageStatus[]) || [];
  } catch (error) {
    console.error('Failed to fetch storage data:', error);
  }

  return <StoragePageContent initialDisks={disks} initialPackages={packages} />;
}
