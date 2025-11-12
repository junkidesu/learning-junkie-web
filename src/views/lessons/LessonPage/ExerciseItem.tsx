import { Box, Divider, Paper, Stack, Typography } from "@mui/material";
import { Exercise } from "../../../types";
import { HistoryEdu, QuestionMark, Quiz, Rule } from "@mui/icons-material";

const ExerciseItem = ({ exercise }: { exercise: Exercise }) => {
  return (
    <Paper square={false} elevation={3} sx={{ p: 2 }}>
      <Stack gap={2}>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" gap={2} alignItems="center">
            {exercise.content.tag === "TypeAnswer" && <QuestionMark />}
            {exercise.content.tag === "Quiz" && <Quiz />}
            {exercise.content.tag === "Essay" && <HistoryEdu />}
            {exercise.content.tag === "Coding" && <Rule />}

            <Typography variant="h6">{exercise.title}</Typography>
          </Stack>

          <Typography fontWeight="bold">
            Grade: 0/{exercise.maxGrade}
          </Typography>
        </Stack>

        <Typography component="span" color="text.secondary">
          {exercise.description}
        </Typography>

        <Divider />

        {exercise.content.tag === "TypeAnswer" && (
          <Box>
            <Typography>{exercise.content.question}</Typography>
          </Box>
        )}
        {exercise.content.tag === "Quiz" && (
          <Box>
            <Typography>{exercise.content.question}</Typography>

            <Typography>A: {exercise.content.options.A}</Typography>
            <Typography>B: {exercise.content.options.B}</Typography>
            <Typography>C: {exercise.content.options.C}</Typography>
            <Typography>D: {exercise.content.options.D}</Typography>
          </Box>
        )}
        {exercise.content.tag === "TrueFalse" && (
          <Box>
            <Typography>{exercise.content.question}</Typography>
          </Box>
        )}

        {exercise.content.tag === "Essay" && (
          <Box>
            <Typography>{exercise.content.task}</Typography>
          </Box>
        )}
      </Stack>
    </Paper>
  );
};

export default ExerciseItem;
