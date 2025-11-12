import { Stack, Typography, TextField, Button } from "@mui/material";
import { Exercise, Submission } from "../../../../types";
import { useEffect, useState } from "react";
import useAuthUser from "../../../../hooks/useAuthUser";
import { useAddSubmissionMutation } from "../../../../services/submissions.service";

const Essay = ({
  exercise,
  userSolution,
}: {
  exercise: Exercise;
  userSolution?: Submission;
}) => {
  const [essayAnswer, setEssayAnswer] = useState("");

  const { authUser } = useAuthUser();

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
        await addSubmission({ id: exercise.lesson.id, body: body! });
        console.log("Success!");
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (exercise.content.tag !== "Essay") return null;

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
        disabled={!authUser || Boolean(userSolution)}
      />

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

export default Essay;
