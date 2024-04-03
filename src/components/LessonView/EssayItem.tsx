import {
  Card,
  Stack,
  Typography,
  TextField,
  Container,
  Button,
} from "@mui/material";
import { Essay } from "../../types";
import useAuthUser from "../../hooks/useAuthUser";
import { useState } from "react";
import { usePostEssaySolutionMutation } from "../../services/solutions.service";

const EssayItem = ({ essay }: { essay: Essay }) => {
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
              disabled={!existsId}
            >
              Submit
            </Button>
          )}
        </Container>
      </Stack>
    </Card>
  );
};

export default EssayItem;
