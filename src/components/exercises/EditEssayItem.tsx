import {
  Button,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Essay } from "../../types";
import React, { useState } from "react";
import { useEditEssayMutation } from "../../services/exercises.service";

const EditEssayItem = ({ essay }: { essay: Essay }) => {
  const [newTask, setNewTask] = useState(essay.task);
  const [newModel, setNewModel] = useState("");

  const [editEssay] = useEditEssayMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Updating essay");

    try {
      await editEssay({
        id: essay.id,
        body: {
          task: newTask,
          model: newModel,
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
            {essay.title}
          </Typography>
          <Typography>Grade: {essay.grade}</Typography>
        </Stack>

        <Stack gap={4}>
          <TextField
            label="Task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            required
          />
          <TextField
            label="New Model Answer"
            value={newModel}
            onChange={(e) => setNewModel(e.target.value)}
            multiline
            minRows={4}
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

export default EditEssayItem;
