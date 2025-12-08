import { listSmbShares, listZfsPools } from '@/actions/shares';
import { SharesTabs } from '@/components/Shares/SharesTabs';
import { Container, Title } from '@mantine/core';
import type { SMBShare, ZFSPool } from '@/lib/client';

export const dynamic = 'force-dynamic';

export default async function SharesPage() {
  const [smbShares, zfsPools] = await Promise.all([
    listSmbShares(),
    listZfsPools()
  ]);

  return (
    <Container fluid>
      <Title order={2} mb="lg">Storage & Shares</Title>
      <SharesTabs 
        smbShares={(smbShares.data as SMBShare[]) || []} 
        zfsPools={(zfsPools.data as ZFSPool[]) || []} 
      />
    </Container>
  );
}
