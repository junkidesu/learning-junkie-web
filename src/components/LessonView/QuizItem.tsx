import { Card, Stack, Typography, Container, Button } from "@mui/material";
import { Quiz } from "../../types";

const QuizItem = ({ quiz }: { quiz: Quiz }) => {
  return <Card variant="elevation" elevation={5}>
    <Stack gap={2} sx={{ p: 1 }}>
      <Stack direction="row">
        <Typography fontWeight="bold" fontStyle="italic" sx={{ flexGrow: 1 }}>
          {quiz.title || "Quiz"}
        </Typography>

        <Typography fontWeight="bold">
          {quiz.grade === 1 ? "1 point" : `${quiz.grade} points`}
        </Typography>
      </Stack>

      <Typography>{quiz.question}</Typography>

      <Container sx={{ width: "100%" }}>
        <Button sx={{ float: "right" }} variant="contained">
          Check
        </Button>
      </Container>
    </Stack>
  </Card>;
};

export default QuizItem;
