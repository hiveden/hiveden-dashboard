"use client";
import { parseCommand } from "@/lib/commandParser";
import { SegmentedControl, Card, Text, Badge, Stack, Code, SimpleGrid, Box, Tooltip, Loader, Center } from "@mantine/core";
import { IconTerminal } from "@tabler/icons-react";
import { useState, useEffect, useMemo } from "react";
import type { Container as DockerContainerInfo, EnvVar, Mount } from "@/lib/client";
import { ContainerLogs } from "./ContainerLogs";
import { Terminal } from "@/components/Terminal/Terminal";
import { ShellService } from "@/services/shellService";

interface ExtendedContainer extends DockerContainerInfo {
  Env?: EnvVar[];
  Mounts?: Mount[];
}

interface PortBinding {
  HostPort?: string | number;
  host_port?: number;
  container_port?: string | number;
  protocol?: string;
}

export function ContainerTabs({ container }: { container: ExtendedContainer }) {
  const [activeTab, setActiveTab] = useState("info");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoadingShell, setIsLoadingShell] = useState(false);
  const [shellError, setShellError] = useState<string | null>(null);
  const shellService = useMemo(() => new ShellService(), []);

  useEffect(() => {
    const createShellSession = async () => {
      if (activeTab === "shell" && !sessionId && container.State === "running") {
        setIsLoadingShell(true);
        setShellError(null);
        try {
          const session = await shellService.createDockerSession(container.Id, {
            user: "root",
            working_dir: "/",
          });
          setSessionId(session.session_id);
        } catch (error) {
          console.error("Failed to create shell session:", error);
          setShellError(error instanceof Error ? error.message : "Failed to create shell session");
        } finally {
          setIsLoadingShell(false);
        }
      }
    };

    createShellSession();

    // Cleanup: close session when component unmounts
    return () => {
      if (sessionId) {
        shellService.closeSession(sessionId).catch(console.error);
      }
    };
  }, [activeTab, container.Id, container.State, sessionId, shellService]);

  const handleCloseShell = async () => {
    if (sessionId) {
      try {
        await shellService.closeSession(sessionId);
        setSessionId(null);
        setActiveTab("info");
      } catch (error) {
        console.error("Failed to close shell session:", error);
      }
    }
  };

  const formattedCommand = useMemo(() => parseCommand(container.Command).join("\n"), [container.Command]);

  return (
    <>
      <Tooltip.Group>
        <SegmentedControl
          value={activeTab}
          onChange={setActiveTab}
          data={[
            { label: "Container Information", value: "info" },
            { label: "Logs", value: "logs" },
            { label: "Raw Data", value: "raw" },
            { label: "Shell", value: "shell" },
          ]}
          mb="md"
        />
      </Tooltip.Group>

      {activeTab === "info" && (
        <Stack gap="md">
          <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Text fw={500} size="lg" mb="md">
              Basic Information
            </Text>
            <SimpleGrid cols={{ base: 1, md: 2 }}>
              <div>
                <Text size="sm" c="dimmed">
                  Name
                </Text>
                <Text fw={500}>{container.Name || "N/A"}</Text>
              </div>
              <div>
                <Text size="sm" c="dimmed">
                  ID
                </Text>
                <Code>{container.Id}</Code>
              </div>
              <div>
                <Text size="sm" c="dimmed">
                  Image
                </Text>
                <Text fw={500}>{container.Image}</Text>
              </div>
              <div>
                <Text size="sm" c="dimmed">
                  State
                </Text>
                <Badge color={container.State === "running" ? "green" : "gray"}>{container.State || "Unknown"}</Badge>
              </div>
              {container.Status && (
                <div>
                  <Text size="sm" c="dimmed">
                    Status
                  </Text>
                  <Text fw={500}>{container.Status}</Text>
                </div>
              )}
              {container.Command && formattedCommand && (
                <div>
                  <Text size="sm" c="dimmed">
                    Command
                  </Text>
                  <Code block>{formattedCommand}</Code>
                </div>
              )}
            </SimpleGrid>
          </Card>

          {container.Env && container.Env.length > 0 && (
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Text fw={500} size="lg" mb="md">
                Environment Variables
              </Text>
              <Stack gap="xs">
                {container.Env.map((env, idx) => (
                  <div key={idx}>
                    <Text size="sm" c="dimmed">
                      {env.name}
                    </Text>
                    <Code block>{env.value}</Code>
                  </div>
                ))}
              </Stack>
            </Card>
          )}

          {container.Ports && Object.values(container.Ports).length > 0 && (
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Text fw={500} size="lg" mb="md">
                Port Mappings
              </Text>
              <SimpleGrid cols={{ base: 1, md: 2 }}>
                {Object.entries(container.Ports)
                  .flatMap(([key, value]) => {
                    if (!value) return [];
                    return (value as any[]).map((binding) => ({
                      ...binding,
                      container_port: key,
                      protocol: key.split("/")[1] || "tcp",
                    }));
                  })
                  .map((port: PortBinding, idx) => (
                    <div key={idx}>
                      <Text size="sm">
                        <Code>{port.HostPort || port.host_port}</Code> → <Code>{port.container_port || "?"}</Code>
                        {port.protocol && (
                          <Text span c="dimmed">
                            {" "}
                            ({port.protocol})
                          </Text>
                        )}
                      </Text>
                    </div>
                  ))}
              </SimpleGrid>
            </Card>
          )}

          {container.Mounts && container.Mounts.length > 0 && (
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Text fw={500} size="lg" mb="md">
                Mounts
              </Text>
              <Stack gap="md">
                {container.Mounts.map((mount, idx) => (
                  <div key={idx}>
                    <Text size="sm" c="dimmed">
                      Type: {mount.type || "bind"}
                    </Text>
                    <Text size="sm">
                      <Code>{mount.source}</Code> → <Code>{mount.target}</Code>
                    </Text>
                  </div>
                ))}
              </Stack>
            </Card>
          )}

          {container.Labels && Object.keys(container.Labels).length > 0 && (
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Text fw={500} size="lg" mb="md">
                Labels
              </Text>
              <SimpleGrid cols={{ base: 1, md: 3 }}>
                {Object.entries(container.Labels).map(([key, value]) => (
                  <div key={key}>
                    <Text size="sm" c="dimmed">
                      {key}
                    </Text>
                    <Code block>{String(value)}</Code>
                  </div>
                ))}
              </SimpleGrid>
            </Card>
          )}
        </Stack>
      )}

      {activeTab === "logs" && <ContainerLogs containerId={container.Id} />}

      {activeTab === "raw" && (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text fw={500} size="lg" mb="md">
            Raw Data
          </Text>
          <Code block>{JSON.stringify(container, null, 2)}</Code>
        </Card>
      )}

      {activeTab === "shell" && (
        <>
          {container.State !== "running" ? (
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Text fw={500} size="lg" mb="md">
                Shell Access
              </Text>
              <Text c="dimmed">Container must be running to access shell.</Text>
            </Card>
          ) : isLoadingShell ? (
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Center h={200}>
                <Stack align="center" gap="md">
                  <Loader size="md" />
                  <Text c="dimmed">Creating shell session...</Text>
                </Stack>
              </Center>
            </Card>
          ) : shellError ? (
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <Text fw={500} size="lg" mb="md">
                Shell Access
              </Text>
              <Text c="red">{shellError}</Text>
            </Card>
          ) : sessionId ? (
            <Terminal sessionId={sessionId} onClose={handleCloseShell} title={`Shell - ${container.Name || container.Id.substring(0, 12)}`} />
          ) : null}
        </>
      )}
    </>
  );
}
