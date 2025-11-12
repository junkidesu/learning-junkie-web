import {
  Stack,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import useAuthUser from "../../../../hooks/useAuthUser";
import { useAddSubmissionMutation } from "../../../../services/submissions.service";
import { Exercise, NewSubmission, Submission } from "../../../../types";

const QuizAnswer = ({
  exercise,
  userSolution,
}: {
  exercise: Exercise;
  userSolution?: Submission;
}) => {
  const [quizAnswer, setQuizAnswer] = useState("A");

  const { authUser } = useAuthUser();

  const [addSubmission] = useAddSubmissionMutation();

  useEffect(() => {
    if (userSolution && userSolution.content.tag === "QuizAnswer") {
      setQuizAnswer(userSolution.content.quizAnswer.toString());
    }
  }, [setQuizAnswer, userSolution]);

  if (exercise.content.tag !== "Quiz") return null;

  const handleQuizChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuizAnswer((event.target as HTMLInputElement).value);
  };

  const handleAnswerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const tag = exercise.content.tag;

    if (tag === "Quiz") {
      const body: NewSubmission = {
        content: {
          tag: "QuizAnswer",
          quizAnswer,
        },
      };

      try {
        await addSubmission({ id: exercise.id, body: body! });
        console.log("Success!");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <Stack
      component="form"
      gap={2}
      alignItems="start"
      onSubmit={handleAnswerSubmit}
    >
      <Typography>{exercise.content.question}</Typography>

      <FormControl disabled={!authUser || Boolean(userSolution)}>
        <FormLabel>Choose the correct answer</FormLabel>
        <RadioGroup value={quizAnswer} onChange={handleQuizChange}>
          <FormControlLabel
            value="A"
            control={<Radio />}
            label={`A: ${exercise.content.options.A}`}
          />
          <FormControlLabel
            value="B"
            control={<Radio />}
            label={`B: ${exercise.content.options.B}`}
          />
          <FormControlLabel
            value="C"
            control={<Radio />}
            label={`C: ${exercise.content.options.C}`}
          />
          <FormControlLabel
            value="D"
            control={<Radio />}
            label={`D: ${exercise.content.options.D}`}
          />
        </RadioGroup>
      </FormControl>

      <Button
        variant="contained"
        type="submit"
        disabled={!authUser || Boolean(userSolution)}
      >
        Submit
      </Button>
    </Stack>
  );
};

export default QuizAnswer;
