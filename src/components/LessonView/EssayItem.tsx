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
import { Essay } from "../../types";
import useAuthUser from "../../hooks/useAuthUser";
import { useState } from "react";
import { usePostEssaySolutionMutation } from "../../services/solutions.service";

const EssayItem = ({ essay }: { essay: Essay }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const [answer, setAnswer] = useState("");

  const { existsId, solutions } = useAuthUser();

  const [postSolution] = usePostEssaySolutionMutation();

  const handleCheck = async () => {
    console.log(answer);

    const result = await postSolution({
      id: essay.id,
      body: { answer },
    }).unwrap();

    console.log(result);

    setSnackbarOpen(true);
  };

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;

    setSnackbarOpen(false);
  };

  const isSolved = solutions?.map((e) => e.id).includes(essay.id);

  return (
    <Card variant="elevation" elevation={5}>
      <Stack gap={2} sx={{ p: 2 }}>
        <Stack direction="row">
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {essay.title || "Essay"}
          </Typography>

          <Typography variant="h6">
            Grade: {isSolved ? essay.grade : 0} {"/ "}
            {essay.grade}
          </Typography>
        </Stack>

        <Typography>{essay.task}</Typography>

        <TextField
          label="Answer"
          variant="filled"
          fullWidth
          required
          multiline
          minRows={4}
          disabled={!existsId}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />

        <Container sx={{ width: "100%" }}>
          {isSolved ? (
            <Button
              sx={{ float: "right" }}
              variant="contained"
              color="success"
              disabled={!existsId}
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
              Submit
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
          severity={"success"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          Successfully submitted!
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default EssayItem;