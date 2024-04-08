import {
  Box,
  Button,
  Container,
  MobileStepper,
  Stack,
  Step,
  StepButton,
  Stepper,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetCourseLessonsQuery } from "../services/lessons.service";
import { useState } from "react";
import LessonView from "../components/LessonView";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

const LessonsPage = () => {
  const courseId = useParams().id;

  const [activeLesson, setActiveLesson] = useState(0);

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

  const isLastLesson = () => {
    return activeLesson === totalLessons() - 1;
  };

  const handleNext = () => {
    if (!isLastLesson()) setActiveLesson((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveLesson((prevActiveLesson) => prevActiveLesson - 1);
  };

  const handleLesson = (step: number) => () => {
    setActiveLesson(step);
  };

  if (lessons.length === 0)
    return <Typography>This course does not have any lessons yet!</Typography>;

  return (
    <Container sx={{ p: 0 }}>
      <Stack sx={{ gap: 2 }}>
        <Stepper
          nonLinear
          activeStep={activeLesson}
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          {lessons.map((lesson, index) => (
            <Step key={lesson.number}>
              <StepButton color="inherit" onClick={handleLesson(index)}>
                {lesson.title}
              </StepButton>
            </Step>
          ))}
        </Stepper>

        <Container sx={{ width: "100%", p: 0 }}>
          <LessonView lesson={lessons[activeLesson]} />
          <Box
            sx={{
              display: { md: "flex", xs: "none" },
              flexDirection: "row",
              pt: 2,
            }}
          >
            <Button
              disabled={activeLesson === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Previous
            </Button>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button
              onClick={handleNext}
              sx={{ mr: 1 }}
              disabled={isLastLesson()}
            >
              Next
            </Button>
          </Box>

          <MobileStepper
            variant="text"
            steps={totalLessons()}
            position="static"
            activeStep={activeLesson}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeLesson === totalLessons() - 1}
              >
                Next
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeLesson === 0}
              >
                <KeyboardArrowLeft />
                Back
              </Button>
            }
            sx={{ display: { xs: "flex", md: "none" } }}
          />
        </Container>
      </Stack>
    </Container>
  );
};

export default LessonsPage;
