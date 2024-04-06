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
import { useNavigate } from "react-router-dom";
import EssayItem from "./EssayItem";

const AddEssays = ({ lesson }: { lesson: Lesson }) => {
  const [title, setTitle] = useState("");
  const [task, setTask] = useState("");
  const [model, setModel] = useState("");
  const [grade, setGrade] = useState("");

  const { data: essays } = useGetLessonEssaysQuery({
    id: lesson.course.id,
    number: lesson.number,
  });

  const navigate = useNavigate();

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
    <Paper sx={{ p: 2 }}>
      <Stack gap={2}>
        <Paper sx={{ p: 2 }} elevation={5}>
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
              essays.map((e) => <EssayItem key={e.id} essay={e} />)
            )}
          </Stack>
        )}
        <Container>
          <Button
            color="success"
            variant="contained"
            sx={{ float: "right" }}
            onClick={() =>
              navigate(`/courses/${lesson.course.id}/lessons/edit`)
            }
          >
            Finish
          </Button>
        </Container>
      </Stack>
    </Paper>
  );
};

export default AddEssays;
