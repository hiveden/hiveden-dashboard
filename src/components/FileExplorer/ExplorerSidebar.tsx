'use client';

import { Stack, NavLink, Text, Badge, Group, ScrollArea, ThemeIcon } from '@mantine/core';
import { 
  IconHome, 
  IconFolder, 
  IconDownload, 
  IconPhoto, 
  IconDeviceFloppy, 
  IconStar 
} from '@tabler/icons-react';
import { useExplorer } from './ExplorerProvider';

export function ExplorerSidebar() {
  const { navigateTo, currentPath } = useExplorer();

  return (
    <Stack gap={0} h="100%" w={240} style={{ borderRight: '1px solid var(--mantine-color-default-border)' }} bg="var(--mantine-color-body)">
      <ScrollArea style={{ flex: 1 }}>
        <Stack gap="md" p="md">
          
          {/* Quick Access */}
          <BoxSection title="Quick Access">
            <NavItem 
              icon={<IconHome size={16} />} 
              label="Home" 
              path="/" 
              active={currentPath === '/'} 
              onClick={() => navigateTo('/')}
            />
             {/* Common folders - logic to be added to resolve real paths */}
            <NavItem 
              icon={<IconFolder size={16} />} 
              label="Documents" 
              path="/Documents" 
              active={currentPath === '/Documents'} 
              onClick={() => navigateTo('/Documents')}
            />
            <NavItem 
              icon={<IconDownload size={16} />} 
              label="Downloads" 
              path="/Downloads" 
              active={currentPath === '/Downloads'} 
              onClick={() => navigateTo('/Downloads')}
            />
            <NavItem 
              icon={<IconPhoto size={16} />} 
              label="Pictures" 
              path="/Pictures" 
              active={currentPath === '/Pictures'} 
              onClick={() => navigateTo('/Pictures')}
            />
          </BoxSection>

          {/* Bookmarks - Placeholder */}
          <BoxSection title="Bookmarks" rightSection={<Badge size="xs" circle>0</Badge>}>
             <Text size="xs" c="dimmed" fs="italic">No bookmarks yet</Text>
          </BoxSection>

           {/* USB Devices - Placeholder */}
           <BoxSection title="USB Devices">
             <Text size="xs" c="dimmed" fs="italic">No devices detected</Text>
          </BoxSection>

        </Stack>
      </ScrollArea>
    </Stack>
  );
}

function BoxSection({ title, children, rightSection }: { title: string, children: React.ReactNode, rightSection?: React.ReactNode }) {
    return (
        <Stack gap="xs">
            <Group justify="space-between">
                <Text size="xs" fw={700} c="dimmed" tt="uppercase" style={{ letterSpacing: 0.5 }}>{title}</Text>
                {rightSection}
            </Group>
            <Stack gap={2}>
                {children}
            </Stack>
        </Stack>
    )
}

function NavItem({ icon, label, path, active, onClick }: { icon: React.ReactNode, label: string, path: string, active: boolean, onClick: () => void }) {
    return (
        <NavLink
            label={label}
            leftSection={icon}
            active={active}
            onClick={onClick}
            variant="light"
            style={{ borderRadius: 'var(--mantine-radius-sm)' }}
        />
    )
}
