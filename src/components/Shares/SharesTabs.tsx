'use client';

import { SegmentedControl, Text, Box } from '@mantine/core';
import { useState } from 'react';
import { SMBList } from './SMBList';
import type { SMBShare, ZFSPool } from '@/lib/client';

export function SharesTabs({ smbShares, zfsPools }: { smbShares: SMBShare[], zfsPools: ZFSPool[] }) {
  const [activeTab, setActiveTab] = useState('smb');

  return (
    <>
      <SegmentedControl
        value={activeTab}
        onChange={setActiveTab}
        data={[
          { label: 'SMB Shares', value: 'smb' },
          { label: 'ZFS Pools', value: 'zfs' },
        ]}
        mb="md"
      />

      {activeTab === 'smb' && <SMBList shares={smbShares} />}
      
      {activeTab === 'zfs' && (
        <Box>
          <Text>ZFS Pools: {JSON.stringify(zfsPools)}</Text>
        </Box>
      )}
    </>
  );
}
