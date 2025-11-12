import { Box, Typography } from "@mui/material";
import { Lesson } from "../../../types";
import { useGetLessonExercisesQuery } from "../../../services/exercises.service";
import ExerciseItem from "./ExerciseItem";

const LessonExercises = ({ lesson }: { lesson: Lesson }) => {
  const {
    data: exercises,
    isLoading,
    isError,
  } = useGetLessonExercisesQuery(lesson.id);

  if (isLoading) return <Typography>Loading exercises...</Typography>;

  if (isError || !exercises)
    return <Typography>Some error has occurred!</Typography>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {exercises.map((exercise) => (
        <ExerciseItem key={exercise.id} exercise={exercise} />
      ))}
    </Box>
  );
};

export default LessonExercises;
