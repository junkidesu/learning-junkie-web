import { Stack, Typography } from "@mui/material";

import { Exercise } from "../../../../../types";

const Essay = ({ exercise }: { exercise: Exercise }) => {
  if (exercise.content.tag !== "Essay") return null;

  return (
    <Stack gap={2} alignItems="start">
      <Typography>
        <b>Essay task: </b>
        {exercise.content.task}
      </Typography>
    </Stack>
  );
};

export default Essay;
