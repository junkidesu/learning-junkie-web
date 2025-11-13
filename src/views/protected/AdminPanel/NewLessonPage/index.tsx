import { useNavigate, useParams } from "react-router-dom";
import { useGetChapterByNumberQuery } from "../../../../services/chapter.service";
import {
  Box,
  Button,
  Divider,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import NewLessonForm from "./NewLessonForm";
import { useGetChapterLessonsQuery } from "../../../../services/lessons.service";
import { useState } from "react";
import React from "react";
import AddExercises from "./AddExercises";

const steps = ["Add lesson information", "Add Exercises"];

const NewLessonPage = () => {
  const courseId = useParams().id;
  const chapterNumber = useParams().chapterNumber;
  const [newLessonId, setNewLessonId] = useState<number | undefined>(undefined);

  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);

  const {
    data: chapter,
    isLoading,
    isError,
  } = useGetChapterByNumberQuery(
    {
      id: Number(courseId),
      chapterNumber: Number(chapterNumber),
    },
    { skip: !courseId || !chapterNumber }
  );

  const {
    data: lessons,
    isLoading: lessonsLoading,
    isError: lessonsError,
  } = useGetChapterLessonsQuery(
    {
      id: Number(courseId!),
      chapterNumber: Number(chapterNumber),
    },
    { skip: !courseId || !chapterNumber }
  );

  if (isLoading || lessonsLoading) return <Typography>Loading...</Typography>;

  if (isError || lessonsError || !chapter || !lessons)
    return <Typography>Some error has occurred!</Typography>;

  if (!courseId || !chapterNumber) return null;

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const lastLessonNumber =
    lessons.length === 0
      ? 0
      : Math.max(...lessons.map((lesson) => lesson.number));
  return (
    <Paper
      square={false}
      sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}
    >
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
          <Typography variant="h5">New Lesson</Typography>
          <Divider />
          <NewLessonForm
            chapter={chapter}
            lastLessonNumber={Number(lastLessonNumber)}
            setActiveStep={setActiveStep}
            setNewLessonId={setNewLessonId}
          />
        </React.Fragment>
      )}

      {activeStep === 1 && (
        <React.Fragment>
          <Typography variant="h5">Add exercises</Typography>

          <Divider />
          <AddExercises newLessonId={newLessonId} />

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button
              onClick={() => navigate(`/courses/${chapter.course.id}/edit`)}
            >
              Finish
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Paper>
  );
};

export default NewLessonPage;
