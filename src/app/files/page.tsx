import { ExplorerLayout } from '@/components/FileExplorer/ExplorerLayout';
import { Container } from '@mantine/core';

export default function FileExplorerPage() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <ExplorerLayout />
    </div>
  );
}
