"use client";

import { AppShell, Group, Box, ScrollArea } from "@mantine/core";
import { ExplorerSidebar } from "./ExplorerSidebar";
import { ExplorerToolbar } from "./ExplorerToolbar";
import { FileList } from "./FileList";
import { ExplorerProvider } from "./ExplorerProvider";

export function ExplorerLayout() {
  return (
    <ExplorerProvider>
      <Group
        align="stretch"
        gap={0}
        style={{
          // height: 'calc(100vh - 60px)',
          overflow: "hidden",
        }}
      >
        {/* Assuming Header is 60px, adjust calculation based on layout */}

        <ExplorerSidebar />

            <Box style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}>
                <ExplorerToolbar />
                <ScrollArea style={{ flex: 1, minHeight: 0 }} bg="var(--mantine-color-body)" type="auto">
                    <FileList />
                </ScrollArea>
            </Box>

        {/* Operations Panel (Phase 3) - Placeholder position */}
      </Group>
    </ExplorerProvider>
  );
}
