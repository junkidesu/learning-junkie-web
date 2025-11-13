import { Paper, Stack, Typography } from "@mui/material";
import { useGetLessonExercisesQuery } from "../../../../services/exercises.service";
import { Lesson } from "../../../../types";

const EditExercisesList = ({ lesson }: { lesson: Lesson }) => {
  const {
    data: exercises,
    isLoading,
    isError,
  } = useGetLessonExercisesQuery(lesson.id);

  if (isLoading) return <Typography>Loading exercises...</Typography>;

  if (isError || !exercises)
    return <Typography>Some error has occurred!</Typography>;

  return (
    <Stack gap={2}>
      {exercises.map((exercise) => (
        <Paper elevation={3} sx={{ p: 2 }}>
          {exercise.title}
        </Paper>
      ))}
    </Stack>
  );
};

export default EditExercisesList;
