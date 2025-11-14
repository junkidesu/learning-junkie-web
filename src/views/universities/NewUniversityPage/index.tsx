import {
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import NewUniversityForm from "./NewUniversityForm";
import NewUniversityRepresentatives from "./NewUniversityRepresentatives";
import { useNavigate } from "react-router-dom";
import NewUniversityInstructors from "./NewUniversityInstructors";

const steps = ["Register University", "Add Representatives", "Add Instructors"];

const NewUniversityPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [universityId, setUniversityId] = useState<number | undefined>();

  const navigate = useNavigate();

  const isStepOptional = (step: number) => {
    return step === 2;
  };

  return (
    <Container sx={{ mb: 2 }}>
      <Paper sx={{ p: 2 }}>
        <Stack gap={2}>
          <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
              const stepProps: { completed?: boolean } = {};
              const labelProps: {
                optional?: React.ReactNode;
              } = {};
              if (isStepOptional(index)) {
                labelProps.optional = (
                  <Typography variant="caption">Optional</Typography>
                );
              }

              return (
                <Step key={label} {...stepProps}>
                  <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
              );
            })}
          </Stepper>

          <Divider />

          {activeStep === 0 && (
            <NewUniversityForm
              setActiveStep={setActiveStep}
              setUniversityId={setUniversityId}
            />
          )}
          {activeStep === 1 && (
            <React.Fragment>
              <NewUniversityRepresentatives universityId={universityId} />

              <Stack direction="row" justifyContent="end">
                <Button variant="text" onClick={() => navigate(`/admin`)}>
                  Finish
                </Button>
                <Button variant="text" onClick={() => setActiveStep(2)}>
                  Next
                </Button>
              </Stack>
            </React.Fragment>
          )}

          {activeStep === 2 && (
            <React.Fragment>
              <NewUniversityInstructors universityId={universityId} />
              <Stack direction="row" justifyContent="end">
                <Button variant="text" onClick={() => setActiveStep(1)}>
                  Back
                </Button>
                <Button variant="text" onClick={() => navigate(`/admin`)}>
                  Finish
                </Button>
              </Stack>
            </React.Fragment>
          )}
        </Stack>
      </Paper>
    </Container>
  );
};

export default NewUniversityPage;
