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
import { Exercise, Submission } from "../../../../types";
import { useEffect, useState } from "react";
import useAuthUser from "../../../../hooks/useAuthUser";
import { useAddSubmissionMutation } from "../../../../services/submissions.service";

const TrueFalse = ({
  exercise,
  userSolution,
}: {
  exercise: Exercise;
  userSolution?: Submission;
}) => {
  const [trueFalseAnswer, setTrueFalseAnswer] = useState("false");

  const { authUser } = useAuthUser();

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
        disabled={!authUser || Boolean(userSolution)}
      >
        Submit
      </Button>
    </Stack>
  );
};

export default TrueFalse;
