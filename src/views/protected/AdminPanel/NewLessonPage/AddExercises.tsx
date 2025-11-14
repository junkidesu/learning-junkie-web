import { Divider, Stack, Typography } from "@mui/material";
import AddExerciseForm from "./AddExerciseForm";
import { useGetLessonExercisesQuery } from "../../../../services/exercises.service";
import EditExerciseForm from "./EditExerciseForm";

const AddExercises = ({ newLessonId }: { newLessonId?: number }) => {
  const {
    data: exercises,
    isLoading,
    isError,
  } = useGetLessonExercisesQuery(Number(newLessonId), {
    skip: !newLessonId,
  });

  if (isLoading) return <Typography>Loading exercises...</Typography>;

  if (isError || !exercises)
    return <Typography>Some error has occurred!</Typography>;

  if (!newLessonId) return null;

  return (
    <Stack gap={2}>
      <AddExerciseForm lessonId={newLessonId} />

      <Divider />

      <Typography variant="h6">Added exercises</Typography>

      <Stack gap={2}>
        {exercises.map((e) => (
          <EditExerciseForm key={e.id} exercise={e} />
        ))}
      </Stack>
    </Stack>
  );
};

export default AddExercises;
