import {
  Card,
  Stack,
  Typography,
  TextField,
  Container,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { ExerciseStatus, Question } from "../../types";
import {
  useGetQuestionSolutionQuery,
  usePostQuestionSolutionMutation,
} from "../../services/solutions.service";
import { useState } from "react";
import useAuthUser from "../../hooks/useAuthUser";

const QuestionItem = ({ question }: { question: Question }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [correct, setCorrect] = useState(false);

  const { existsId, solutions } = useAuthUser();

  const isSolved = solutions?.map((e) => e.id).includes(question.id);

  const { data: solution } = useGetQuestionSolutionQuery(question.id, {
    skip: !isSolved,
  });

  const [answer, setAnswer] = useState("");

  const [postSolution, { isLoading: postingSolution }] =
    usePostQuestionSolutionMutation();

  const handleCheck = async () => {
    console.log(answer);

    const result = await postSolution({
      id: question.id,
      body: { answer },
    }).unwrap();

    if (result.result === ExerciseStatus.ExerciseFailure) {
      console.log("Failure!");
      setCorrect(false);
      setSnackbarOpen(true);
    } else if (result.result === ExerciseStatus.ExerciseSuccess) {
      console.log("Success!");
      setCorrect(true);
      setSnackbarOpen(true);
    }
  };

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;

    setSnackbarOpen(false);
  };

  const showSolution = () => {
    if (solution) {
      setAnswer(solution?.answer);
    }
  };

  return (
    <Card variant="elevation" elevation={5}>
      <Stack gap={2} sx={{ p: 2 }}>
        <Stack direction={{ xs: "column", md: "row" }}>
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
          disabled={!existsId || isSolved || postingSolution}
          onChange={(e) => setAnswer(e.target.value)}
        />

        <Container sx={{ width: "100%" }}>
          {isSolved ? (
            <Button
              sx={{ float: "right" }}
              variant="contained"
              disabled={!existsId}
              onClick={showSolution}
              color="success"
            >
              See Solution
            </Button>
          ) : (
            <Button
              sx={{ float: "right" }}
              variant="contained"
              onClick={handleCheck}
              disabled={!existsId || !answer || postingSolution}
            >
              Check
            </Button>
          )}
        </Container>
      </Stack>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={correct ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {correct ? "Your answer is correct!" : "Your answer is incorrect!"}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default QuestionItem;
