"use client";

import { Button, Group, Tooltip } from "@mantine/core";
import { IconPlayerPlay, IconPlayerStop, IconRefresh, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { stopContainer, startContainer, removeContainer, restartContainer } from "@/actions/docker";
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
    try {
      await restartContainer(containerId);
      notifications.show({
        title: "Container restarted",
        message: "The container has been restarted successfully",
        color: "green",
      });
      router.refresh();
    } catch (error) {
      notifications.show({
        title: "Error",
        message: error instanceof Error ? error.message : "Failed to restart container",
        color: "red",
      });
    } finally {
      setLoading(null);
    }
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
  const isRestarting = containerState === "restarting";
  const canStart = containerState === "exited" || containerState === "created";
  const canStop = isRunning || isRestarting;
  const canRestart = isRunning || isRestarting; // Can only restart if running or already restarting
  const canDelete = containerState === "exited" || containerState === "created" || containerState === "dead";

  return (
    <Group gap="xs">
      {canStop ? (
        <Button variant="light" color="orange" leftSection={<IconPlayerStop size={16} />} onClick={handleStop} loading={loading === "stop"}>
          Stop
        </Button>
      ) : (
        <Button variant="light" color="green" leftSection={<IconPlayerPlay size={16} />} onClick={handleStart} loading={loading === "start"} disabled={!canStart}>
          Start
        </Button>
      )}

      <Button 
        variant="light" 
        color="blue" 
        leftSection={<IconRefresh size={16} />} 
        onClick={handleRestart} 
        loading={loading === "restart"}
        disabled={!canRestart} // Disable if not running or restarting
      >
        Restart
      </Button>

      <Tooltip label="Container must be stopped to delete" disabled={canDelete} withArrow>
        <Button
          variant="light"
          color="red"
          leftSection={<IconTrash size={16} />}
          onClick={handleDelete}
          loading={loading === "delete"}
          disabled={!canDelete}
        >
          Delete
        </Button>
      </Tooltip>
    </Group>
  );
}
