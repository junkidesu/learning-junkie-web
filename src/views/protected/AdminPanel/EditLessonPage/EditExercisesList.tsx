import { Stack, Typography } from "@mui/material";
import { useGetLessonExercisesQuery } from "../../../../services/exercises.service";
import { Lesson } from "../../../../types";
import EditExerciseForm from "../NewLessonPage/EditExerciseForm";

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
        <EditExerciseForm key={exercise.id} exercise={exercise} />
      ))}
    </Stack>
  );
};

export default EditExercisesList;
