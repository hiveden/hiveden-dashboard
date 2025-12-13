"use client";

import { useState, useEffect } from "react";
import { Box, Button, Group, Title, Accordion, ActionIcon, Text, Badge } from "@mantine/core";
import { IconTrash, IconCheck } from "@tabler/icons-react";
import { useContainerForm, ContainerFormState } from "@/hooks/useContainerForm";
import { ContainerForm } from "./ContainerForm";

interface MultiContainerReviewProps {
  initialContainers: Partial<ContainerFormState>[];
  onBack: () => void;
  onSubmit: (data: ContainerFormState[]) => void;
}

export function MultiContainerReview({ initialContainers, onBack, onSubmit }: MultiContainerReviewProps) {
  const [containers, setContainers] = useState<Partial<ContainerFormState>[]>(initialContainers);
  // Store the current state of each form. 
  // We initialize with what we have. As child forms update, they will call onUpdate.
  // Note: We need a way to track the *latest* data from each child form.
  // We can use a ref or just updating state. State is cleaner but triggers re-renders.
  
  const [formsData, setFormsData] = useState<ContainerFormState[]>([]);

  // Initialize formsData size
  useEffect(() => {
    // We can't easily initialize "full" ContainerFormState from "Partial" without the hook's logic running.
    // So we rely on the children to "register" their initial state.
    // But for "onSubmit", we need to wait until all are ready?
    // Actually, we can just maintain a list of current data that updates as children change.
  }, [initialContainers]);

  const handleUpdate = (index: number, data: ContainerFormState) => {
    setFormsData((prev) => {
      const next = [...prev];
      next[index] = data;
      return next;
    });
  };

  const handleDelete = (index: number) => {
      // Remove from both lists
      setContainers(prev => prev.filter((_, i) => i !== index));
      setFormsData(prev => prev.filter((_, i) => i !== index));
  };

  const handleDeployAll = () => {
    // Filter out undefineds if any (shouldn't happen if initialized correctly)
    const validData = formsData.filter(Boolean);
    onSubmit(validData);
  };

  return (
    <Box>
      <Title order={3} mb="lg">
        Review Containers ({containers.length})
      </Title>

      <Accordion multiple variant="separated" radius="md">
        {containers.map((container, index) => (
          <Accordion.Item key={`${container.name}-${index}`} value={`${container.name}-${index}`}>
            <Accordion.Control>
                <Group justify="space-between" pr="md">
                    <Text fw={500}>{container.name || `Container ${index + 1}`}</Text>
                    <Badge color={container.image ? 'blue' : 'gray'}>{container.image || 'No Image'}</Badge>
                </Group>
            </Accordion.Control>
            <Accordion.Panel>
                 {/* 
                   We render a sub-component that uses the hook. 
                   This ensures each form has its own state isolation.
                 */}
                 <ContainerReviewItem 
                    initialValue={container} 
                    onUpdate={(data) => handleUpdate(index, data)}
                    onDelete={() => handleDelete(index)}
                 />
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>

      <Group justify="flex-end" mt="xl">
        <Button variant="default" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleDeployAll} disabled={formsData.length !== containers.length}>
          Deploy All ({containers.length})
        </Button>
      </Group>
    </Box>
  );
}

interface ContainerReviewItemProps {
    initialValue: Partial<ContainerFormState>;
    onUpdate: (data: ContainerFormState) => void;
    onDelete: () => void;
}

function ContainerReviewItem({ initialValue, onUpdate, onDelete }: ContainerReviewItemProps) {
    const form = useContainerForm(initialValue);
    
    // Sync back to parent whenever form data changes
    useEffect(() => {
        const prepareSubmissionData = () => {
            const labelsRecord: Record<string, string> = {};
            form.labelsList.forEach((l) => {
              if (l.key) labelsRecord[l.key] = l.value;
            });
        
            return {
              ...form.formData,
              labels: labelsRecord,
            };
        };
        onUpdate(prepareSubmissionData());
        // We only want to trigger this when actual data changes
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.formData, form.labelsList]);

    return (
        <Box>
            <Group justify="flex-end" mb="md">
                <Button color="red" variant="subtle" leftSection={<IconTrash size={16}/>} onClick={onDelete}>
                    Remove Container
                </Button>
            </Group>
            <ContainerForm form={form} />
        </Box>
    )
}
