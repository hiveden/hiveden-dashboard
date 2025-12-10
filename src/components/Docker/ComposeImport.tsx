"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Group, Paper, Textarea, Title, Alert, Stack, LoadingOverlay } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import yaml from "js-yaml";
import { ContainerForm } from "./ContainerForm";
import { useContainerForm, ContainerFormState } from "@/hooks/useContainerForm";
import { EnvVar, Port, Mount } from "@/lib/client";
import { handleCreateContainer, handleCreateTemplate } from '@/lib/container-submission';

export function ComposeImport() {
  const router = useRouter();
  const [yamlContent, setYamlContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [parsedData, setParsedData] = useState<Partial<ContainerFormState> | null>(null);

  const handleParse = () => {
    setError(null);
    try {
      const doc = yaml.load(yamlContent) as any;
      if (!doc || !doc.services) {
        throw new Error('Invalid Docker Compose file: No "services" defined.');
      }

      const services = Object.keys(doc.services);
      if (services.length === 0) {
        throw new Error("No services found in the Compose file.");
      }

      // Take the first service
      const serviceName = services[0];
      const service = doc.services[serviceName];

      const mappedData: Partial<ContainerFormState> = {
        name: service.container_name || serviceName,
        image: service.image || "",
        enabled: true,
      };

      // Command
      if (service.command) {
        if (Array.isArray(service.command)) {
          mappedData.command = service.command;
        } else if (typeof service.command === "string") {
          mappedData.command = service.command.split(" ");
        }
      }

      // Environment
      if (service.environment) {
        const envs: EnvVar[] = [];
        if (Array.isArray(service.environment)) {
          service.environment.forEach((e: string) => {
            const sepIndex = e.indexOf("=");
            if (sepIndex !== -1) {
              envs.push({ name: e.substring(0, sepIndex), value: e.substring(sepIndex + 1) });
            } else {
              // Handle empty value or pass-through
              envs.push({ name: e, value: "" });
            }
          });
        } else if (typeof service.environment === "object") {
          Object.entries(service.environment).forEach(([key, value]) => {
            envs.push({ name: key, value: String(value) });
          });
        }
        mappedData.env = envs;
      }

      // Ports
      if (service.ports) {
        const ports: Port[] = [];
        service.ports.forEach((p: string | number | object) => {
          if (typeof p === "string" || typeof p === "number") {
            const pStr = String(p);
            if (pStr.includes(":")) {
              const parts = pStr.split(":");
              // simple case: 8080:80
              if (parts.length >= 2) {
                // Check for protocol in the last part (e.g. 80/tcp)
                const lastPart = parts[parts.length - 1];
                const containerPart = lastPart.split("/")[0];
                const protocol = lastPart.includes("/udp") ? "udp" : "tcp";

                const host = parseInt(parts[parts.length - 2]);
                const container = parseInt(containerPart);

                if (!isNaN(host) && !isNaN(container)) {
                  ports.push({ host_port: host, container_port: container, protocol });
                }
              }
            } else {
              const port = parseInt(pStr);
              // If only one port, docker maps it to an ephemeral port, but we need explicit mapping in UI usually.
              // We'll set both to same for convenience.
              if (!isNaN(port)) {
                ports.push({ host_port: port, container_port: port, protocol: "tcp" });
              }
            }
          }
        });
        mappedData.ports = ports;
      }

      // Volumes
      if (service.volumes) {
        const mounts: Mount[] = [];
        service.volumes.forEach((v: string | object) => {
          if (typeof v === "string") {
            const parts = v.split(":");
            if (parts.length >= 2) {
              mounts.push({ source: parts[0], target: parts[1], type: "bind" });
            }
          }
        });
        mappedData.mounts = mounts;
      }

      // Labels
      if (service.labels) {
        if (Array.isArray(service.labels)) {
          const labels: Record<string, string> = {};
          service.labels.forEach((l: string) => {
            const [k, v] = l.split("=");
            labels[k] = v || "";
          });
          mappedData.labels = labels;
        } else if (typeof service.labels === "object") {
          mappedData.labels = service.labels as Record<string, string>;
        }
      }

      setParsedData(mappedData);
    } catch (e: any) {
      setError(e.message || "Failed to parse YAML");
    }
  };

  if (parsedData) {
    return (
      <ImportStepWrapper 
          initialValues={parsedData} 
          onCancel={() => setParsedData(null)} 
      />
    );
  }

  return (
    <Box h="85vh">
      <Title order={3} mb="lg">
        Import from Docker Compose
      </Title>

      {error && (
        <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red" mb="md">
          {error}
        </Alert>
      )}

      <Paper p="md" withBorder radius="md" h="80%">
        <Stack justify="space-between" h="100%">
          <Textarea
            label="Docker Compose YAML"
            description="Paste your docker-compose.yml content here. We will parse the first service defined."
            placeholder={`services:\n  web:\n    image: nginx:latest\n    ports:\n      - "8080:80"`}
            minRows={28}
            maxRows={28}
            value={yamlContent}
            autosize
            onChange={(event) => setYamlContent(event.currentTarget.value)}
            style={{ fontFamily: "monospace" }}
          />

          <Group justify="flex-end">
            <Button variant="default" onClick={() => router.push("/docker")}>
              Cancel
            </Button>
            <Button onClick={handleParse} disabled={!yamlContent.trim()}>
              Parse
            </Button>
          </Group>
        </Stack>
      </Paper>
    </Box>
  );
}

function ImportStepWrapper({ initialValues, onCancel }: { initialValues: Partial<ContainerFormState>, onCancel: () => void }) {
    const form = useContainerForm(initialValues);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    return (
      <Box pos="relative">
        <LoadingOverlay visible={loading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
        <Title order={3} mb="lg">
          Review & Create Container
        </Title>
        <ContainerForm form={form} />
        
        <Group justify="flex-end" mt="xl">
            <Button variant="default" onClick={onCancel}>Back to Import</Button>
            <Button variant="outline" onClick={() => handleCreateTemplate(form.formData, form.labelsList, router, setLoading)} loading={loading}>
                Save Template
            </Button>
            <Button onClick={() => handleCreateContainer(form.formData, form.labelsList, router, setLoading)} loading={loading}>
                Deploy Container
            </Button>
        </Group>
      </Box>
    );
}
