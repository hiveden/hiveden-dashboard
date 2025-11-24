'use client';

import { SegmentedControl, Text, Box } from '@mantine/core';
import { useState } from 'react';
import { SMBList } from './SMBList';

export function SharesTabs({ smbShares, zfsPools }: { smbShares: any[], zfsPools: any[] }) {
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
