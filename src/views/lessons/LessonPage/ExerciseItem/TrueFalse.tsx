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
import { Exercise, Submission, SubmissionState } from "../../../../types";
import { useEffect, useState } from "react";
import useAuthUser from "../../../../hooks/useAuthUser";
import { useAddSubmissionMutation } from "../../../../services/submissions.service";
import useAlert from "../../../../hooks/useAlert";

const TrueFalse = ({
  exercise,
  userSolution,
}: {
  exercise: Exercise;
  userSolution?: Submission;
}) => {
  const [trueFalseAnswer, setTrueFalseAnswer] = useState("false");

  const { authUser } = useAuthUser();

  const { showAlert } = useAlert();

  const [addSubmission] = useAddSubmissionMutation();

  useEffect(() => {
    if (userSolution && userSolution.content.tag === "TrueFalse") {
      setTrueFalseAnswer(userSolution.content.trueFalseAnswer.toString());
    }
  }, [setTrueFalseAnswer, userSolution]);

  if (exercise.content.tag !== "TrueFalse") return null;

  const handleTrueFalseChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTrueFalseAnswer((event.target as HTMLInputElement).value);
  };

  const handleAnswerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const tag = exercise.content.tag;

    if (tag === "TrueFalse") {
      const body = {
        content: {
          tag,
          trueFalseAnswer: trueFalseAnswer === "true",
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
        <RadioGroup
          row
          value={trueFalseAnswer}
          onChange={handleTrueFalseChange}
        >
          <FormControlLabel value="true" control={<Radio />} label="True" />
          <FormControlLabel value="false" control={<Radio />} label="False" />
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

export default TrueFalse;
