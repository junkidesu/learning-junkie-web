import { Stack, Typography, TextField, Button } from "@mui/material";
import { Exercise, Submission, SubmissionState } from "../../../../types";
import { useAddSubmissionMutation } from "../../../../services/submissions.service";
import { useEffect, useState } from "react";
import useAuthUser from "../../../../hooks/useAuthUser";
import useAlert from "../../../../hooks/useAlert";

const TypeAnswer = ({
  exercise,
  userSolution,
}: {
  exercise: Exercise;
  userSolution?: Submission;
}) => {
  const [typedAnswer, setTypedAnswer] = useState<string>("");

  const { authUser } = useAuthUser();

  const { showAlert } = useAlert();

  const [addSubmission] = useAddSubmissionMutation();

  useEffect(() => {
    if (userSolution && userSolution.content.tag === "TypeAnswer") {
      setTypedAnswer(userSolution.content.typedAnswer);
    }
  }, [setTypedAnswer, userSolution]);

  if (exercise.content.tag !== "TypeAnswer") return null;

  const handleAnswerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (exercise.content.tag === "TypeAnswer") {
      const body = {
        content: {
          tag: exercise.content.tag,
          typedAnswer,
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

      <TextField
        label="Answer"
        fullWidth
        helperText="Please enter the answer to the question"
        value={typedAnswer}
        onChange={(e) => setTypedAnswer(e.target.value)}
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

export default TypeAnswer;
