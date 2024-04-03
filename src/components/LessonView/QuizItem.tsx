import {
  Card,
  Stack,
  Typography,
  Container,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Quiz } from "../../types";
import { useState } from "react";
import useAuthUser from "../../hooks/useAuthUser";
import { usePostQuizSolutionMutation } from "../../services/solutions.service";

const QuizItem = ({ quiz }: { quiz: Quiz }) => {
  const [answer, setAnswer] = useState<string>("A");

  const { existsId, solutions } = useAuthUser();

  const [postSolution] = usePostQuizSolutionMutation();

  const handleCheck = async () => {
    console.log(answer);

    const result = await postSolution({
      id: quiz.id,
      body: { answer },
    }).unwrap();

    console.log(result);
  };

  const isSolved = solutions?.map((e) => e.id).includes(quiz.id);

  return (
    <Card variant="elevation" elevation={5}>
      <Stack gap={2} sx={{ p: 2 }}>
        <Stack direction="row">
          <Typography typography="h6" sx={{ flexGrow: 1 }}>
            {quiz.title || "Quiz"}
          </Typography>

          <Typography variant="h6">
            Grade: {isSolved ? quiz.grade : 0} {"/ "}
            {quiz.grade}
          </Typography>
        </Stack>

        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            {quiz.question}
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            onChange={(e) => setAnswer(e.target.value)}
          >
            <FormControlLabel
              value="A"
              control={<Radio />}
              label={quiz.options.A}
            />
            <FormControlLabel
              value="B"
              control={<Radio />}
              label={quiz.options.B}
            />
            <FormControlLabel
              value="C"
              control={<Radio />}
              label={quiz.options.C}
            />
            <FormControlLabel
              value="D"
              control={<Radio />}
              label={quiz.options.D}
            />
          </RadioGroup>
        </FormControl>

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
              Check
            </Button>
          )}
        </Container>
      </Stack>
    </Card>
  );
};

export default QuizItem;
