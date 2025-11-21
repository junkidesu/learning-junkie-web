import { Divider, Stack, Typography } from "@mui/material";
import { HistoryEdu, QuestionMark, Quiz, Rule } from "@mui/icons-material";
import Essay from "./Essay";
import { Exercise } from "../../../../../types";

const ExerciseItem = ({ exercise }: { exercise: Exercise }) => {
  return (
    <Stack gap={2}>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" gap={2} alignItems="center">
          {exercise.content.tag === "TypeAnswer" && <QuestionMark />}
          {exercise.content.tag === "Quiz" && <Quiz />}
          {exercise.content.tag === "Essay" && <HistoryEdu />}
          {exercise.content.tag === "Coding" && <Rule />}

          <Typography variant="h6">{exercise.title}</Typography>
        </Stack>
      </Stack>

      <Typography component="span" color="text.secondary">
        {exercise.description}
      </Typography>

      <Divider />

      {exercise.content.tag === "Essay" && <Essay exercise={exercise} />}
    </Stack>
  );
};

export default ExerciseItem;
