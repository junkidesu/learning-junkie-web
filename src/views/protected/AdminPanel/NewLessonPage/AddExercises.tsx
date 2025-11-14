import { Divider, Stack, Typography } from "@mui/material";
import AddExerciseForm from "./AddExerciseForm";
import { useGetLessonExercisesQuery } from "../../../../services/exercises.service";
import EditExerciseForm from "./EditExerciseForm";

const AddExercises = ({ lessonId }: { lessonId?: number }) => {
  const {
    data: exercises,
    isLoading,
    isError,
  } = useGetLessonExercisesQuery(Number(lessonId), {
    skip: !lessonId,
  });

  if (isLoading) return <Typography>Loading exercises...</Typography>;

  if (isError || !exercises)
    return <Typography>Some error has occurred!</Typography>;

  if (!lessonId) return null;

  return (
    <Stack gap={2}>
      <AddExerciseForm lessonId={lessonId} />

      <Divider />

      <Typography variant="h6">Added exercises</Typography>

      <Stack gap={2}>
        {exercises.length === 0 ? (
          <Typography>No exercises so far!</Typography>
        ) : (
          exercises.map((e) => <EditExerciseForm key={e.id} exercise={e} />)
        )}
      </Stack>
    </Stack>
  );
};

export default AddExercises;
