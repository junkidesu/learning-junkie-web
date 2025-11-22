import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  Divider,
  Link,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import CourseNavigation from "../../../components/courses/CourseNavigation";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAddLessonCompletionMutation,
  useGetLessonByIdQuery,
} from "../../../services/lessons.service";
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import React from "react";
import useAuthUser from "../../../hooks/useAuthUser";
import LessonExercises from "./LessonExercises";
import useAlert from "../../../hooks/useAlert";
import NextLessonButton from "./NextLessonButton";

const steps = ["Lesson", "Exercises", "Discussion"];

const LessonPage = () => {
  const { showAlert } = useAlert();

  const lessonId = useParams().id;

  // Used for stepper
  const [activeStep, setActiveStep] = useState(0);

  const { lessonCompletions } = useAuthUser();

  // Discussion is optional
  const isStepOptional = (step: number) => {
    return step === 2;
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const { authUser } = useAuthUser();

  const {
    data: lesson,
    isLoading,
    isError,
  } = useGetLessonByIdQuery(Number(lessonId), {
    skip: !lessonId,
  });

  const [completeLesson] = useAddLessonCompletionMutation();

  const navigate = useNavigate();

  if (isLoading) return <Typography>Lesson Loading...</Typography>;

  if (isError || !lesson)
    return <Typography>Some error has occurred!</Typography>;

  const isLessonCompleted = lessonCompletions
    ?.map((lc) => lc.lesson.id)
    ?.some((id) => id === lesson.id);

  const handleCompleteLesson = async () => {
    try {
      if (isLessonCompleted) {
        setActiveStep(1);
      } else {
        if (authUser) {
          await completeLesson(lesson.id).unwrap();
          console.log("Success!");
          showAlert({
            message: "Successfully completed lesson!",
            severity: "success",
          });
        }
        setActiveStep(1);
      }
    } catch (error) {
      console.error(error);

      showAlert({
        message: "Could not complete lesson :(",
        severity: "error",
      });
    }
  };

  return (
    <Stack
      direction={{ md: "row", xs: "column" }}
      pl={{ md: "24px", sm: "24px", xs: 0 }}
      pr={{ md: "24px", sm: "24px", xs: 0 }}
      mb={2}
      gap={{ xs: 1, sm: 2, md: 2 }}
      alignItems="start"
    >
      <CourseNavigation activeLesson={lesson} course={lesson.chapter.course} />

      <Paper
        sx={{
          p: 2,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Breadcrumbs>
          <Link
            onClick={() => navigate(`/courses/${lesson.chapter.course.id}`)}
          >
            {lesson.chapter.course.title}
          </Link>

          <Typography>{lesson.chapter.title}</Typography>

          <Typography>{lesson.title}</Typography>
        </Breadcrumbs>
        <Divider />
        <Typography variant="h4">
          {lesson.number} {lesson.title}
        </Typography>
        <Divider />
        <Typography color="text.secondary">{lesson.description}</Typography>
        <Divider />
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

        {activeStep === 0 && (
          <React.Fragment>
            {lesson.components.map((component) =>
              component.tag === "Markdown" ? (
                <MDEditor.Markdown
                  key={component.content}
                  style={{ backgroundColor: "transparent" }}
                  source={component.content}
                />
              ) : (
                <Typography key={component.title}>Video</Typography>
              )
            )}
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <Button
                sx={{ mr: 1, width: "fit-content" }}
                onClick={handleCompleteLesson} // ideally, this will also complete the lesson
              >
                Go to Exercises
              </Button>
            </Box>
          </React.Fragment>
        )}

        {activeStep === 1 && (
          <React.Fragment>
            <LessonExercises lesson={lesson} />

            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />

              <Button onClick={handleNext}>Go to Discussion</Button>

              <NextLessonButton lesson={lesson} setActiveStep={setActiveStep} />
            </Box>
          </React.Fragment>
        )}

        {activeStep === 2 && (
          <React.Fragment>
            <Container>Page with discussion (Coming soon!)</Container>

            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />

              <NextLessonButton lesson={lesson} setActiveStep={setActiveStep} />
            </Box>
          </React.Fragment>
        )}
      </Paper>
    </Stack>
  );
};

export default LessonPage;
