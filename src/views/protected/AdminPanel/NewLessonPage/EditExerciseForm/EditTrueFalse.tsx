import {
  Stack,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useEditExerciseMutation } from "../../../../../services/exercises.service";
import { Exercise, NewExercise } from "../../../../../types";

const EditTrueFalse = ({
  exercise,
  title,
  description,
  maxGrade,
}: {
  title: string;
  description: string;
  maxGrade: number;
  exercise: Exercise;
}) => {
  const [question, setQuestion] = useState(
    exercise.content.tag === "TrueFalse" ? exercise.content.question : ""
  );
  const [correctBool, setCorrectBool] = useState("false");

  const [editExercise] = useEditExerciseMutation();

  const handleTrueFalseChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCorrectBool((event.target as HTMLInputElement).value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body: NewExercise = {
      title,
      description,
      maxGrade,
      content: {
        tag: "TrueFalse",
        question,
        correctBool: correctBool === "true",
      },
    };

    try {
      await editExercise({ id: exercise.id, body }).unwrap();

      console.log("Success!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Stack component="form" gap={2} alignItems="start" onSubmit={handleSubmit}>
      <TextField
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
        label="Question"
        helperText="Please answer the exercise question"
        fullWidth
      />

      <FormControl required>
        <FormLabel>Choose the correct answer</FormLabel>
        <RadioGroup row value={correctBool} onChange={handleTrueFalseChange}>
          <FormControlLabel value="true" control={<Radio />} label="True" />
          <FormControlLabel value="false" control={<Radio />} label="False" />
        </RadioGroup>
      </FormControl>

      <Button variant="contained" type="submit">
        Submit
      </Button>
    </Stack>
  );
};

export default EditTrueFalse;
