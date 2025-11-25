'use client';

import { AppShell, Burger, Group, NavLink, Text, useMantineColorScheme, ActionIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconBrandDocker, IconServer, IconShare, IconInfoCircle, IconSun, IconMoon, IconTemplate, IconFileText } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export function Shell({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();
  const pathname = usePathname();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { label: 'System Info', icon: IconInfoCircle, link: '/' },
    { label: 'Docker', icon: IconBrandDocker, link: '/docker' },
    { label: 'LXC', icon: IconServer, link: '/lxc' },
    { label: 'Network Shares', icon: IconShare, link: '/shares' },
    { label: 'Templates', icon: IconTemplate, link: '/templates' },
    { label: 'Logs', icon: IconFileText, link: '/logs' },
  ];

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Text fw={700} size="lg">Hiveden</Text>
          </Group>
          <ActionIcon onClick={() => toggleColorScheme()} variant="default" size="lg" aria-label="Toggle color scheme">
            {mounted && (colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />)}
          </ActionIcon>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        {navItems.map((item) => (
          <NavLink
            key={item.link}
            component={Link}
            href={item.link}
            label={item.label}
            leftSection={<item.icon size="1rem" stroke={1.5} />}
            active={pathname === item.link || (item.link !== '/' && pathname.startsWith(item.link))}
            variant="light"
          />
        ))}
      </AppShell.Navbar>

      <AppShell.Main>
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
