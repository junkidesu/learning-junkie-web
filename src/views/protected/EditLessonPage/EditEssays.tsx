import {
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Lesson } from "../../../types";
import {
  useAddEssayMutation,
  useGetLessonEssaysQuery,
} from "../../../services/lessons.service";
import React, { useState } from "react";
import EditEssayItem from "../../../components/exercises/EditEssayItem";

const EditEssays = ({ lesson }: { lesson: Lesson }) => {
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");
  const [model, setModel] = useState("");
  const [grade, setGrade] = useState("");

  const { data: essays } = useGetLessonEssaysQuery({
    id: lesson.course.id,
    number: lesson.number,
  });

  const [addEssay] = useAddEssayMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addEssay({
        lesson,
        body: {
          title,
          task,
          model,
          grade: Number(grade),
        },
      });

      console.log("Success!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Stack gap={2} sx={{ p: 2 }}>
      <Paper sx={{ p: 2, width: "100%" }} elevation={10}>
        <Stack gap={4} component="form" onSubmit={handleSubmit}>
          <Typography variant="h6">New Essay</Typography>

          <TextField
            label="Title"
            helperText="Please enter the essay title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            label="Task"
            helperText="Please enter the task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            required
          />

          <TextField
            label="Model Answer"
            helperText="Please enter the model answer"
            value={model}
            multiline
            minRows={4}
            onChange={(e) => setModel(e.target.value)}
            required
          />

          <TextField
            label="Grade"
            helperText="Please enter the grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />

          <Container>
            <Button variant="contained" sx={{ float: "right" }} type="submit">
              Submit
            </Button>
          </Container>
        </Stack>
      </Paper>

      {essays && (
        <Stack gap={2}>
          <Typography variant="h6">Added Essays</Typography>

          {essays.length === 0 ? (
            <Typography>No essays so far!</Typography>
          ) : (
            essays.map((e) => <EditEssayItem key={e.id} essay={e} />)
          )}
        </Stack>
      )}
    </Stack>
  );
};

export default EditEssays;
