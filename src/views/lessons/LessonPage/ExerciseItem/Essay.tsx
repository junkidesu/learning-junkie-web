import { Stack, Typography, TextField, Button } from "@mui/material";
import { Exercise, Submission, SubmissionState } from "../../../../types";
import { useEffect, useState } from "react";
import useAuthUser from "../../../../hooks/useAuthUser";
import { useAddSubmissionMutation } from "../../../../services/submissions.service";
import useAlert from "../../../../hooks/useAlert";

const Essay = ({
  exercise,
  userSolution,
}: {
  exercise: Exercise;
  userSolution?: Submission;
}) => {
  const [essayAnswer, setEssayAnswer] = useState("");

  const { authUser } = useAuthUser();

  const { showAlert } = useAlert();

  const [addSubmission] = useAddSubmissionMutation();

  useEffect(() => {
    if (userSolution && userSolution.content.tag === "Essay") {
      setEssayAnswer(userSolution.content.essayAnswer.toString());
    }
  }, [setEssayAnswer, userSolution]);

  const handleAnswerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const tag = exercise.content.tag;

    if (tag === "Essay") {
      const body = {
        content: {
          tag,
          essayAnswer,
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

  if (exercise.content.tag !== "Essay") return null;

  const isSubmissionSuccess = userSolution?.state === SubmissionState.Success;

  return (
    <Stack
      component="form"
      gap={2}
      alignItems="start"
      onSubmit={handleAnswerSubmit}
    >
      <Typography>{exercise.content.task}</Typography>

      <TextField
        multiline
        fullWidth
        minRows={4}
        value={essayAnswer}
        label="Essay Answer"
        helperText="Please provide the response to the essay task"
        onChange={(e) => setEssayAnswer(e.target.value)}
        disabled={!authUser || isSubmissionSuccess}
      />

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

export default Essay;
