import { Stack, TextField, Button } from "@mui/material";
import { useState } from "react";
import { NewExercise } from "../../../../../types";
import { useAddExerciseMutation } from "../../../../../services/exercises.service";

const AddEssay = ({
  title,
  description,
  maxGrade,
  lessonId,
}: {
  title: string;
  description: string;
  maxGrade: number;
  lessonId: number;
}) => {
  const [task, setTask] = useState("");
  const [model, setModel] = useState("");

  const [addExercise] = useAddExerciseMutation();

  const handleAnswerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body: NewExercise = {
      title,
      description,
      maxGrade,
      content: { tag: "Essay", task, model },
    };

    try {
      await addExercise({ id: lessonId, body }).unwrap();

      console.log("Success!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Stack
      component="form"
      gap={2}
      alignItems="start"
      onSubmit={handleAnswerSubmit}
    >
      <TextField
        fullWidth
        value={task}
        label="Essay Answer"
        helperText="Please enter the essay task"
        onChange={(e) => setTask(e.target.value)}
        required
      />

      <TextField
        multiline
        fullWidth
        minRows={4}
        value={model}
        label="Model Answer"
        helperText="Please provide a model answer to the essay task"
        onChange={(e) => setModel(e.target.value)}
        required
      />

      <Button variant="contained" type="submit">
        Submit
      </Button>
    </Stack>
  );
};

export default AddEssay;
