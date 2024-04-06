import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { Essay } from "../../../types";

const EssayItem = ({ essay }: { essay: Essay }) => {
  return (
    <Paper sx={{ p: 2 }} elevation={5}>
      <Stack gap={1}>
        <Stack direction="row">
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {essay.title}
          </Typography>
          <Typography>Grade: {essay.grade}</Typography>
        </Stack>

        <Typography>{essay.task}</Typography>

        <Divider />

        <Stack direction="row">
          <Button color="error">Delete</Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default EssayItem;
