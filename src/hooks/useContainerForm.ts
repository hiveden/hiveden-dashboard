import { useState } from 'react';
import { ContainerCreate, EnvVar, Port, Mount } from '@/lib/client';

export type ContainerFormState = Omit<ContainerCreate, 'command'> & {
  command: string[];
};

export interface UseContainerFormReturn {
  formData: ContainerFormState;
  setFormData: React.Dispatch<React.SetStateAction<ContainerFormState>>;
  labelsList: { key: string; value: string }[];
  setLabelsList: React.Dispatch<React.SetStateAction<{ key: string; value: string }[]>>;
  handleChange: (field: keyof ContainerFormState, value: unknown) => void;
  // Command
  addCommandArg: () => void;
  removeCommandArg: (index: number) => void;
  updateCommandArg: (index: number, value: string) => void;
  // Env
  addEnv: () => void;
  removeEnv: (index: number) => void;
  updateEnv: (index: number, field: keyof EnvVar, value: string) => void;
  // Port
  addPort: () => void;
  removePort: (index: number) => void;
  updatePort: (index: number, field: keyof Port, value: unknown) => void;
  // Mount
  addMount: () => void;
  removeMount: (index: number) => void;
  updateMount: (index: number, field: keyof Mount, value: unknown) => void;
  // Label
  addLabel: () => void;
  removeLabel: (index: number) => void;
  updateLabel: (index: number, field: 'key' | 'value', value: string) => void;
}

export function useContainerForm(initialValues?: Partial<ContainerFormState>): UseContainerFormReturn {
  const [formData, setFormData] = useState<ContainerFormState>({
    name: '',
    image: '',
    command: [],
    env: [],
    ports: [],
    mounts: [],
    labels: {},
    enabled: true,
    ...initialValues,
  });

  const [labelsList, setLabelsList] = useState<{ key: string; value: string }[]>(() => {
    if (initialValues?.labels) {
      return Object.entries(initialValues.labels).map(([key, value]) => ({ key, value }));
    }
    return [];
  });

  // Helper to update simple fields
  const handleChange = (field: keyof ContainerFormState, value: unknown) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Command List Helpers
  const addCommandArg = () => {
    setFormData(prev => ({ ...prev, command: [...prev.command, ''] }));
  };

  const removeCommandArg = (index: number) => {
    setFormData(prev => ({ ...prev, command: prev.command.filter((_, i) => i !== index) }));
  };

  const updateCommandArg = (index: number, value: string) => {
    setFormData(prev => {
      const newCommand = [...prev.command];
      newCommand[index] = value;
      return { ...prev, command: newCommand };
    });
  };

  // Dynamic List Helpers
  const addEnv = () => {
    setFormData(prev => ({ ...prev, env: [...(prev.env || []), { name: '', value: '' }] }));
  };

  const removeEnv = (index: number) => {
    setFormData(prev => ({ ...prev, env: (prev.env || []).filter((_, i) => i !== index) }));
  };

  const updateEnv = (index: number, field: keyof EnvVar, value: string) => {
    setFormData(prev => {
      const newEnv = [...(prev.env || [])];
      newEnv[index] = { ...newEnv[index], [field]: value };
      return { ...prev, env: newEnv };
    });
  };

  const addPort = () => {
    setFormData(prev => ({ ...prev, ports: [...(prev.ports || []), { host_port: 0, container_port: 0, protocol: 'tcp' }] }));
  };

  const removePort = (index: number) => {
    setFormData(prev => ({ ...prev, ports: (prev.ports || []).filter((_, i) => i !== index) }));
  };

  const updatePort = (index: number, field: keyof Port, value: unknown) => {
    setFormData(prev => {
      const newPorts = [...(prev.ports || [])];
      newPorts[index] = { ...newPorts[index], [field]: value };
      return { ...prev, ports: newPorts };
    });
  };

  const addMount = () => {
    setFormData(prev => ({ ...prev, mounts: [...(prev.mounts || []), { source: '', target: '', type: 'bind' }] }));
  };

  const removeMount = (index: number) => {
    setFormData(prev => ({ ...prev, mounts: (prev.mounts || []).filter((_, i) => i !== index) }));
  };

  const updateMount = (index: number, field: keyof Mount, value: unknown) => {
    setFormData(prev => {
      const newMounts = [...(prev.mounts || [])];
      newMounts[index] = { ...newMounts[index], [field]: value };
      return { ...prev, mounts: newMounts };
    });
  };

  const addLabel = () => {
    setLabelsList(prev => [...prev, { key: '', value: '' }]);
  };

  const removeLabel = (index: number) => {
    setLabelsList(prev => prev.filter((_, i) => i !== index));
  };

  const updateLabel = (index: number, field: 'key' | 'value', value: string) => {
    setLabelsList(prev => {
      const newLabels = [...prev];
      newLabels[index] = { ...newLabels[index], [field]: value };
      return newLabels;
    });
  };

  return {
    formData,
    setFormData,
    labelsList,
    setLabelsList,
    handleChange,
    addCommandArg,
    removeCommandArg,
    updateCommandArg,
    addEnv,
    removeEnv,
    updateEnv,
    addPort,
    removePort,
    updatePort,
    addMount,
    removeMount,
    updateMount,
    addLabel,
    removeLabel,
    updateLabel,
  };
}
