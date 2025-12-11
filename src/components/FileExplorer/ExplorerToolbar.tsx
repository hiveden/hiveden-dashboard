'use client';

import { Group, ActionIcon, Breadcrumbs, TextInput, SegmentedControl, Menu, Button, Box, Anchor, CloseButton } from '@mantine/core';
import { 
  IconArrowLeft, 
  IconArrowRight, 
  IconArrowUp, 
  IconSearch, 
  IconList, 
  IconLayoutGrid, 
  IconSettings,
  IconHome
} from '@tabler/icons-react';
import { useExplorer } from './ExplorerProvider';
import { useState, useEffect } from 'react';
import { SortBy, SortOrder } from '@/lib/client';
import { useDebouncedCallback } from '@mantine/hooks';

export function ExplorerToolbar() {
  const { 
    currentPath, 
    navigateBack, 
    navigateForward, 
    navigateUp, 
    navigateTo, 
    viewMode, 
    setViewMode,
    historyIndex,
    history,
    toggleHidden,
    showHidden,
    setSort,
    sortBy,
    sortOrder,
    performSearch,
    clearSearch,
    isSearching,
    searchQuery
  } = useExplorer();

  const [pathInputMode, setPathInputMode] = useState(false);
  const [pathValue, setPathValue] = useState(currentPath);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setPathValue(currentPath);
  }, [currentPath]);

  // Sync internal search value with global state (e.g. if cleared externally)
  useEffect(() => {
    if (!isSearching && searchValue !== '') {
        setSearchValue('');
    }
  }, [isSearching]);

  const handlePathSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigateTo(pathValue);
    setPathInputMode(false);
  };

  const breadcrumbs = currentPath.split('/').filter(Boolean).map((segment, index, array) => {
     const path = '/' + array.slice(0, index + 1).join('/');
     return (
        <Anchor key={path} size="sm" onClick={() => navigateTo(path)} underline="hover" c="dimmed">
            {segment}
        </Anchor>
     );
  });

  const handleSearch = useDebouncedCallback((query: string) => {
      if (query) {
          performSearch(query);
      } else {
          clearSearch();
      }
  }, 500);

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setSearchValue(val);
      handleSearch(val);
  };

  return (
    <Group justify="space-between" h={60} px="md" style={{ borderBottom: '1px solid var(--mantine-color-default-border)' }} bg="var(--mantine-color-body)">
      
      {/* Navigation */}
      <Group gap={4}>
        <ActionIcon variant="subtle" onClick={navigateBack} disabled={historyIndex <= 0}>
          <IconArrowLeft size={18} />
        </ActionIcon>
        <ActionIcon variant="subtle" onClick={navigateForward} disabled={historyIndex >= history.length - 1}>
          <IconArrowRight size={18} />
        </ActionIcon>
        <ActionIcon variant="subtle" onClick={navigateUp} disabled={currentPath === '/'}>
          <IconArrowUp size={18} />
        </ActionIcon>
      </Group>

      {/* Path / Breadcrumbs */}
      <Box style={{ flex: 1, cursor: 'text' }} onClick={() => !pathInputMode && setPathInputMode(true)}>
        {pathInputMode ? (
            <form onSubmit={handlePathSubmit}>
                <TextInput 
                    value={pathValue} 
                    onChange={(e) => setPathValue(e.target.value)} 
                    autoFocus 
                    onBlur={() => setPathInputMode(false)}
                    rightSection={<IconSearch size={16} />}
                    size="xs"
                />
            </form>
        ) : (
             <Group gap="xs" wrap="nowrap" style={{ overflow: 'hidden' }}>
                 <ActionIcon size="xs" variant="transparent" onClick={(e) => { e.stopPropagation(); navigateTo('/'); }}>
                    <IconHome size={14} />
                 </ActionIcon>
                 <Breadcrumbs separator=">" style={{ flexWrap: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {breadcrumbs}
                 </Breadcrumbs>
             </Group>
        )}
      </Box>

      {/* Search */}
      <TextInput 
        placeholder="Search..." 
        leftSection={<IconSearch size={16} />} 
        size="xs" 
        w={200}
        value={searchValue}
        onChange={onSearchChange}
        rightSection={
            searchValue ? (
                <CloseButton
                    size="sm"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => {
                        setSearchValue('');
                        clearSearch();
                    }}
                    aria-label="Clear search"
                />
            ) : null
        }
      />

      {/* View Controls */}
      <Group gap="xs">
        <SegmentedControl
            size="xs"
            value={viewMode}
            onChange={(val) => setViewMode(val as 'list' | 'grid')}
            data={[
                { value: 'list', label: <IconList size={14} /> },
                { value: 'grid', label: <IconLayoutGrid size={14} /> },
            ]}
        />
        
        <Menu shadow="md" width={200} position="bottom-end">
            <Menu.Target>
                <ActionIcon variant="default">
                    <IconSettings size={18} />
                </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Label>View Options</Menu.Label>
                <Menu.Item 
                    leftSection={<input type="checkbox" checked={showHidden} onChange={toggleHidden} />}
                    onClick={toggleHidden}
                >
                    Show Hidden Files
                </Menu.Item>
                
                <Menu.Divider />
                
                <Menu.Label>Sort By</Menu.Label>
                <Menu.Item onClick={() => setSort(SortBy.NAME, sortOrder)}>Name</Menu.Item>
                <Menu.Item onClick={() => setSort(SortBy.SIZE, sortOrder)}>Size</Menu.Item>
                <Menu.Item onClick={() => setSort(SortBy.MODIFIED, sortOrder)}>Date Modified</Menu.Item>
                
                <Menu.Divider />
                <Menu.Label>Order</Menu.Label>
                <Menu.Item onClick={() => setSort(sortBy, SortOrder.ASC)}>Ascending</Menu.Item>
                <Menu.Item onClick={() => setSort(sortBy, SortOrder.DESC)}>Descending</Menu.Item>
            </Menu.Dropdown>
        </Menu>
      </Group>

    </Group>
  );
}
