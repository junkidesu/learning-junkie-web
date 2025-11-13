import { Stack } from "@mui/material";
import AddExerciseForm from "./AddExerciseForm";

const AddExercises = ({ newLessonId }: { newLessonId?: number }) => {
  if (!newLessonId) return null;

  return (
    <Stack>
      <AddExerciseForm lessonId={newLessonId} />
    </Stack>
  );
};

export default AddExercises;
