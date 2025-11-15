import { Paper, Stack, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useAddChapterMutation } from "../../../services/chapter.service";
import { Course, NewChapter } from "../../../types";
import useAlert from "../../../hooks/useAlert";

const NewChapterForm = ({
  course,
  lastChapterNumber,
}: {
  course: Course;
  lastChapterNumber: number;
}) => {
  const { showAlert } = useAlert();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [addChapter] = useAddChapterMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body: NewChapter = {
      title,
      description,
      number: lastChapterNumber + 1,
    };

    try {
      await addChapter({ id: course.id, body }).unwrap();
      console.log("Success!");
      showAlert({
        message: "Successfully added new chapter!",
        severity: "success",
      });
    } catch (error) {
      console.error(error);
      showAlert({
        message: "Could not add a new chapter :(",
        severity: "error",
      });
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Stack
        sx={{ display: "flex", alignItems: "center", gap: 2 }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">New Chapter</Typography>
        <TextField
          label="Title"
          helperText="Please enter the title of the chapter"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          fullWidth
        />
        <TextField
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          label="Description"
          helperText="Please enter the description of the chapter"
          required
        />

        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Stack>
    </Paper>
  );
};

export default NewChapterForm;
