"use client";

import { ComposeYamlInput, ComposeReview } from '@/components/Docker/ComposeImport';
import { CreateDockerContainers } from '@/components/Docker/CreateDockerContainers';
import { Container, Stepper, Box } from '@mantine/core';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ContainerFormState } from '@/hooks/useContainerForm';

export default function ImportComposePage() {
  const [activeStep, setActiveStep] = useState(0);
  const [parsedData, setParsedData] = useState<Partial<ContainerFormState> | null>(null);
  const [containersToCreate, setContainersToCreate] = useState<ContainerFormState[]>([]);
  const router = useRouter();

  const handleParsed = (data: Partial<ContainerFormState>) => {
    setParsedData(data);
    setActiveStep(1);
  };

  const handleBack = () => {
    setActiveStep(0);
  };
  
  const handleSubmit = (data: ContainerFormState) => {
      setContainersToCreate([data]);
      setActiveStep(2);
  }

  return (
    <Container fluid>
       <Stepper active={activeStep} onStepClick={setActiveStep} allowNextStepsSelect={false}>
        <Stepper.Step label="YAML" description="Paste Docker Compose">
            <Box py="md">
                <ComposeYamlInput 
                    onParsed={handleParsed} 
                    onCancel={() => router.push('/docker')} 
                />
            </Box>
        </Stepper.Step>
        <Stepper.Step label="Validation" description="Review Configuration">
            <Box py="md">
                {parsedData && (
                    <ComposeReview 
                        initialValues={parsedData} 
                        onBack={handleBack}
                        onSubmit={handleSubmit}
                    />
                )}
            </Box>
        </Stepper.Step>
        <Stepper.Step label="Submit" description="Deploying Container">
             <Box py="xl">
                 {activeStep === 2 && containersToCreate.length > 0 && (
                    <CreateDockerContainers containers={containersToCreate} />
                 )}
             </Box>
        </Stepper.Step>
      </Stepper>
    </Container>
  );
}
