"use client";

import { Button, Group, Tooltip } from "@mantine/core";
import { IconPlayerPlay, IconPlayerStop, IconRefresh, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { stopContainer, startContainer, removeContainer } from "@/actions/docker";
import { useRouter } from "next/navigation";
import { notifications } from "@mantine/notifications";

export function ContainerActions({ containerId, containerState }: { containerId: string; containerState: string }) {
  const [loading, setLoading] = useState<string | null>(null);
  const router = useRouter();

  const handleStart = async () => {
    setLoading("start");
    try {
      await startContainer(containerId);
      notifications.show({
        title: "Container started",
        message: "The container has been started successfully",
        color: "green",
      });
      router.refresh();
    } catch (error) {
      notifications.show({
        title: "Error",
        message: error instanceof Error ? error.message : "Failed to start container",
        color: "red",
      });
    } finally {
      setLoading(null);
    }
  };

  const handleStop = async () => {
    setLoading("stop");
    try {
      await stopContainer(containerId);
      notifications.show({
        title: "Container stopped",
        message: "The container has been stopped successfully",
        color: "green",
      });
      router.refresh();
    } catch (error) {
      notifications.show({
        title: "Error",
        message: error instanceof Error ? error.message : "Failed to stop container",
        color: "red",
      });
    } finally {
      setLoading(null);
    }
  };

  const handleRestart = async () => {
    setLoading("restart");
    // TODO: Implement restart action when available in API
    setLoading(null);
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this container?")) return;
    setLoading("delete");
    try {
      await removeContainer(containerId);
      notifications.show({
        title: "Container deleted",
        message: "The container has been deleted successfully",
        color: "green",
      });
      router.push("/docker");
    } catch (error) {
      notifications.show({
        title: "Error",
        message: error instanceof Error ? error.message : "Failed to delete container",
        color: "red",
      });
    } finally {
      setLoading(null);
    }
  };

  const isRunning = containerState === "running";

  return (
    <Group gap="xs">
      {isRunning ? (
        <Button variant="light" color="orange" leftSection={<IconPlayerStop size={16} />} onClick={handleStop} loading={loading === "stop"}>
          Stop
        </Button>
      ) : (
        <Button variant="light" color="green" leftSection={<IconPlayerPlay size={16} />} onClick={handleStart} loading={loading === "start"}>
          Start
        </Button>
      )}

      <Button variant="light" color="blue" leftSection={<IconRefresh size={16} />} onClick={handleRestart} loading={loading === "restart"}>
        Restart
      </Button>

      <Tooltip label="Please stop the container first in order to delete it" disabled={!isRunning} withArrow>
        <Button
          variant="light"
          color="red"
          leftSection={<IconTrash size={16} />}
          onClick={handleDelete}
          loading={loading === "delete"}
          disabled={isRunning}
        >
          Delete
        </Button>
      </Tooltip>
    </Group>
  );
}
