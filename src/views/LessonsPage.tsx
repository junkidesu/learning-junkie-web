import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Step,
  StepButton,
  Stepper,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetCourseLessonsQuery } from "../services/lessons.service";
import { Fragment, useState } from "react";
import LessonView from "../components/LessonView";

const steps = [
  "Select campaign settings",
  "Create an ad group",
  "Create an ad",
];

const LessonsPage = () => {
  const courseId = useParams().id;

  const [activeLesson, setActiveLesson] = useState(0);
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});

  const { data: lessons, isLoading } = useGetCourseLessonsQuery(
    Number(courseId),
    {
      skip: !courseId,
    }
  );

  if (!courseId) return null;

  if (isLoading) return <Typography>Loading...</Typography>;

  if (!lessons) return <Typography>Some error has occurred!</Typography>;

  const totalLessons = () => {
    return lessons.length;
  };

  const completedLessons = () => {
    return Object.keys(completed).length;
  };

  const isLastLesson = () => {
    return activeLesson === totalLessons() - 1;
  };

  const allLessonsCompleted = () => {
    return completedLessons() === totalLessons();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastLesson() && !allLessonsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((_step, i) => !(i in completed))
        : activeLesson + 1;
    setActiveLesson(newActiveStep);
  };

  const handleBack = () => {
    setActiveLesson((prevActiveLesson) => prevActiveLesson - 1);
  };

  const handleLesson = (step: number) => () => {
    setActiveLesson(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeLesson] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  return (
    <Container>
      <Stack sx={{ gap: 2 }}>
        <Paper sx={{ p: 2 }}>
          <Stepper nonLinear activeStep={activeLesson}>
            {lessons.map((lesson, index) => (
              <Step key={lesson.number} completed={completed[index]}>
                <StepButton color="inherit" onClick={handleLesson(index)}>
                  {lesson.title}
                </StepButton>
              </Step>
            ))}
          </Stepper>
        </Paper>

        {allLessonsCompleted() ? (
          <Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All lessons completed - you&apos;re finished
            </Typography>

            <Button>View certificate</Button>
          </Fragment>
        ) : (
          <Container sx={{ width: "100%" }}>
            <LessonView lesson={lessons[activeLesson]} />
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                disabled={activeLesson === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Previous
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {activeLesson !== steps.length && (
                <Button onClick={handleComplete}>
                  {completedLessons() === totalLessons() - 1
                    ? "Finish"
                    : "Complete Lesson"}
                </Button>
              )}
            </Box>
          </Container>
        )}
      </Stack>
    </Container>
  );
};

export default LessonsPage;
