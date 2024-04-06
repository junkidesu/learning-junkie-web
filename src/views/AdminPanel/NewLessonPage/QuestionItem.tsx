import { Button, Divider, Paper, Stack, Typography } from "@mui/material";
import { Question } from "../../../types";

const QuestionItem = ({ question }: { question: Question }) => {
  return (
    <Paper sx={{ p: 2 }} elevation={5}>
      <Stack gap={1}>
        <Stack direction="row">
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {question.title}
          </Typography>
          <Typography>Grade: {question.grade}</Typography>
        </Stack>

        <Typography>{question.question}</Typography>

        <Divider />

        <Stack direction="row">
          <Button color="error">Delete</Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default QuestionItem;
