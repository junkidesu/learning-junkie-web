import { Stack, TextField, Button } from "@mui/material";
import { useState } from "react";
import { Exercise, NewExercise } from "../../../../types";
import { useEditExerciseMutation } from "../../../../services/exercises.service";

const EditEssay = ({
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
  const [task, setTask] = useState(
    exercise.content.tag === "Essay" ? exercise.content.task : ""
  );
  const [model, setModel] = useState("");

  const [editExercise] = useEditExerciseMutation();

  const handleAnswerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body: NewExercise = {
      title,
      description,
      maxGrade,
      content: { tag: "Essay", task, model },
    };

    try {
      await editExercise({ id: exercise.id, body }).unwrap();

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
        label="Task"
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
        Update
      </Button>
    </Stack>
  );
};

export default EditEssay;
