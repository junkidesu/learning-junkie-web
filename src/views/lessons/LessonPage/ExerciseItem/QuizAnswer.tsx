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
import {
  Exercise,
  NewSubmission,
  Submission,
  SubmissionState,
} from "../../../../types";
import useAlert from "../../../../hooks/useAlert";

const QuizAnswer = ({
  exercise,
  userSolution,
}: {
  exercise: Exercise;
  userSolution?: Submission;
}) => {
  const [quizAnswer, setQuizAnswer] = useState("A");

  const { authUser } = useAuthUser();

  const { showAlert } = useAlert();

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
        const submission = await addSubmission({
          id: exercise.id,
          body: body!,
        }).unwrap();
        console.log("Success!");

        if (submission.state === SubmissionState.Success) {
          showAlert({
            message: "Completed the exercise successfully!",
            severity: "success",
          });
        } else if (submission.state === SubmissionState.Failure) {
          showAlert({
            message: "Your answer is incorrect :(",
            severity: "error",
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const isSubmissionSuccess = userSolution?.state === SubmissionState.Success;

  return (
    <Stack
      component="form"
      gap={2}
      alignItems="start"
      onSubmit={handleAnswerSubmit}
    >
      <Typography>{exercise.content.question}</Typography>

      <FormControl disabled={!authUser || isSubmissionSuccess}>
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
        disabled={!authUser || isSubmissionSuccess}
      >
        Submit
      </Button>
    </Stack>
  );
};

export default QuizAnswer;
