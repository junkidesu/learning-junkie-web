import {
  Card,
  Stack,
  Typography,
  TextField,
  Container,
  Button,
} from "@mui/material";
import { Question } from "../../types";

const QuestionItem = ({ question }: { question: Question }) => {
  return (
    <Card variant="elevation" elevation={5}>
      <Stack gap={2} sx={{ p: 2 }}>
        <Stack direction="row">
          <Typography fontWeight="bold" fontStyle="italic" sx={{ flexGrow: 1 }}>
            {question.title || "Question"}
          </Typography>

          <Typography fontWeight="bold">
            {question.grade === 1 ? "1 point" : `${question.grade} points`}
          </Typography>
        </Stack>

        <Typography>{question.question}</Typography>

        <TextField label="Answer" fullWidth required />

        <Container sx={{ width: "100%" }}>
          <Button sx={{ float: "right" }} variant="contained">
            Check
          </Button>
        </Container>
      </Stack>
    </Card>
  );
};

export default QuestionItem;
