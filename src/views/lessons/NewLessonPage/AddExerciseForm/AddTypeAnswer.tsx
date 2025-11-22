import { Stack, TextField, Button } from "@mui/material";
import { useState } from "react";
import { NewExercise } from "../../../../types";
import { useAddExerciseMutation } from "../../../../services/exercises.service";
import { AddExerciseFormProps } from ".";

const AddTypeAnswer = ({
  title,
  setTitle,
  description,
  setDescription,
  maxGrade,
  setMaxGrade,
  lessonId,
}: AddExerciseFormProps) => {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");

  const [addExercise] = useAddExerciseMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body: NewExercise = {
      title,
      description,
      maxGrade,
      content: { tag: "TypeAnswer", question, answer },
    };

    try {
      await addExercise({ id: lessonId, body }).unwrap();

      console.log("Success!");

      setTitle("");
      setDescription("");
      setMaxGrade(0);
      setQuestion("");
      setAnswer("");
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

      <TextField
        label="Answer"
        fullWidth
        helperText="Please enter the answer to the question"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />

      <Button variant="contained" type="submit">
        Submit
      </Button>
    </Stack>
  );
};

export default AddTypeAnswer;
