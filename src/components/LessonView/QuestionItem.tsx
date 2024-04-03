import {
  Card,
  Stack,
  Typography,
  TextField,
  Container,
  Button,
} from "@mui/material";
import { Question } from "../../types";
import { usePostQuestionSolutionMutation } from "../../services/solutions.service";
import { useState } from "react";
import useAuthUser from "../../hooks/useAuthUser";

const QuestionItem = ({ question }: { question: Question }) => {
  const { existsId, solutions } = useAuthUser();

  const [answer, setAnswer] = useState("");

  const [postSolution] = usePostQuestionSolutionMutation();

  const handleCheck = async () => {
    console.log(answer);

    const result = await postSolution({
      id: question.id,
      body: { answer },
    }).unwrap();

    console.log(result);
  };

  const isSolved = solutions?.map((e) => e.id).includes(question.id);

  return (
    <Card variant="elevation" elevation={5}>
      <Stack gap={2} sx={{ p: 2 }}>
        <Stack direction="row">
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {question.title || "Question"}
          </Typography>

          <Typography variant="h6">
            Grade: {isSolved ? question.grade : 0} {"/ "}
            {question.grade}
          </Typography>
        </Stack>

        <Typography>{question.question}</Typography>

        <TextField
          label="Answer"
          fullWidth
          required
          value={answer}
          disabled={!existsId}
          onChange={(e) => setAnswer(e.target.value)}
        />

        <Container sx={{ width: "100%" }}>
          {isSolved ? (
            <Button
              sx={{ float: "right" }}
              variant="contained"
              disabled={!existsId}
              color="success"
            >
              See Solution
            </Button>
          ) : (
            <Button
              sx={{ float: "right" }}
              variant="contained"
              onClick={handleCheck}
              disabled={!existsId || !answer}
            >
              Check
            </Button>
          )}
        </Container>
      </Stack>
    </Card>
  );
};

export default QuestionItem;
