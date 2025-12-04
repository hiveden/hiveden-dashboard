import { listStorageDevices, checkRequiredPackages } from '@/actions/storage';
import { StoragePageContent } from '@/components/Storage/StoragePageContent';

export const dynamic = 'force-dynamic';

export default async function StoragePage() {
  let disks: any[] = [];
  let packages: any[] = [];

  try {
    const [disksRes, pkgsRes] = await Promise.all([
      listStorageDevices(),
      checkRequiredPackages()
    ]);

    disks = disksRes.data || [];
    packages = pkgsRes.data || [];
  } catch (error) {
    console.error('Failed to fetch storage data:', error);
  }

  return <StoragePageContent initialDisks={disks} initialPackages={packages} />;
}
