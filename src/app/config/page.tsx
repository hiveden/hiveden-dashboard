'use client';

import { submitConfig } from '@/actions/config';
import { Button, Container, Textarea, Title, Notification } from '@mantine/core';
import { useState } from 'react';

export default function ConfigPage() {
  const [config, setConfig] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setStatus(null);
    try {
      await submitConfig(config);
      setStatus({ type: 'success', message: 'Configuration submitted successfully' });
    } catch (error: any) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid>
      <Title order={2} mb="lg">System Configuration</Title>
      
      <Textarea
        placeholder="Paste your YAML configuration here"
        label="Configuration"
        minRows={10}
        mb="md"
        value={config}
        onChange={(event) => setConfig(event.currentTarget.value)}
      />

      <Button loading={loading} onClick={handleSubmit}>
        Submit Configuration
      </Button>

      {status && (
        <Notification 
          mt="md" 
          color={status.type === 'success' ? 'green' : 'red'} 
          onClose={() => setStatus(null)}
        >
          {status.message}
        </Notification>
      )}
    </Container>
  );
}
