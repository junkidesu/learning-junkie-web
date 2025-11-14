import { Stack, TextField, Button } from "@mui/material";
import { useState } from "react";
import { EditExercise, Exercise } from "../../../../../types";
import { useEditExerciseMutation } from "../../../../../services/exercises.service";

const EditTypeAnswer = ({
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
  const [question, setQuestion] = useState<string>(
    exercise.content.tag === "TypeAnswer" ? exercise.content.question : ""
  );
  const [answer, setAnswer] = useState<string>("");

  const [editExercise] = useEditExerciseMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body: EditExercise = {
      title,
      description,
      maxGrade,
      content: { tag: "TypeAnswer", question, answer },
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

      <TextField
        label="Answer"
        fullWidth
        helperText="Please enter the answer to the question"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />

      <Button variant="contained" type="submit">
        Update
      </Button>
    </Stack>
  );
};

export default EditTypeAnswer;
