import { CloseTwoTone } from "@mui/icons-material";
import {
  Alert,
  Box,
  Collapse,
  Container,
  IconButton,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { FormEvent, useState } from "react";
import { useGetCourseByIdQuery } from "../../../services/courses.service";
import { useParams } from "react-router-dom";
import { useAddLessonMutation } from "../../../services/lessons.service";
import AddLessonInformation from "./AddLessonInformation";
import AddLessonContent from "./AddLessonContent";
import AddExercises from "./AddExercises";
import { Lesson } from "../../../types";

const steps = ["Add Lesson Information", "Add Lesson Content", "Add Exercises"];

const NewLessonPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [addedLesson, setAddedLesson] = useState<Lesson | undefined>();

  const isStepOptional = (step: number) => {
    return step === 2;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const [alertOpen, setAlertOpen] = useState(false);
  const [number, setNumber] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const courseId = useParams().id;

  const {
    data: course,
    isLoading,
    isError,
  } = useGetCourseByIdQuery(Number(courseId), {
    skip: !courseId,
  });

  const [addLesson] = useAddLessonMutation();

  if (isLoading) return <Typography>Loading...</Typography>;

  if (isError || !course)
    return <Typography>Some error has occurred!</Typography>;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const addedLesson = await addLesson({
        id: course.id,
        body: {
          number: Number(number),
          title,
          description,
          content,
        },
      }).unwrap();

      setAddedLesson(addedLesson);

      handleNext();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Collapse in={alertOpen}>
        <Alert
          severity="error"
          variant="filled"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setAlertOpen(false);
              }}
            >
              <CloseTwoTone fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Something went wrong :(
        </Alert>
      </Collapse>

      <Box sx={{ width: "100%" }}>
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
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>

        <Container>
          {activeStep === 0 && (
            <AddLessonInformation
              course={course}
              number={number}
              setNumber={setNumber}
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
              handleNext={handleNext}
            />
          )}

          {activeStep === 1 && (
            <AddLessonContent
              course={course}
              content={content}
              setContent={setContent}
              handleSubmit={handleSubmit}
              handleBack={handleBack}
            />
          )}

          {activeStep === 2 && addedLesson && (
            <AddExercises lesson={addedLesson} />
          )}
        </Container>
      </Box>
    </Container>
  );
};

export default NewLessonPage;
