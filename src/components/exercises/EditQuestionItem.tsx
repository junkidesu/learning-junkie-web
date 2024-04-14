import {
  Button,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Question } from "../../types";
import { useEditQuestionMutation } from "../../services/exercises.service";
import React, { useState } from "react";

const EditQuestionItem = ({ question }: { question: Question }) => {
  const [newQuestion, setNewQuestion] = useState(question.question);
  const [newAnswer, setNewAnswer] = useState("");

  const [editQuestion] = useEditQuestionMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Updating question");

    try {
      await editQuestion({
        id: question.id,
        body: {
          question: newQuestion,
          answer: newAnswer,
        },
      });

      console.log("Success!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Paper sx={{ p: 2 }} elevation={10}>
      <Stack component="form" gap={4} onSubmit={handleSubmit}>
        <Stack direction="row">
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {question.title}
          </Typography>
          <Typography>Grade: {question.grade}</Typography>
        </Stack>

        <Stack gap={4}>
          <TextField
            label="Question"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            required
          />
          <TextField
            label="New Answer"
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            required
          />
        </Stack>

        <Divider />

        <Stack direction="row">
          <Button type="submit">Update</Button>
          <Button color="error">Delete</Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default EditQuestionItem;
