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
import { useAddExerciseMutation } from "../../../../services/exercises.service";
import { NewExercise } from "../../../../types";
import { AddExerciseFormProps } from ".";

const AddTrueFalse = ({
  title,
  setTitle,
  description,
  setDescription,
  maxGrade,
  setMaxGrade,
  lessonId,
}: AddExerciseFormProps) => {
  const [question, setQuestion] = useState("");
  const [correctBool, setCorrectBool] = useState("false");

  const [addExercise] = useAddExerciseMutation();

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
      await addExercise({ id: lessonId, body }).unwrap();

      console.log("Success!");

      setTitle("");
      setDescription("");
      setMaxGrade(0);
      setQuestion("");
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

export default AddTrueFalse;
