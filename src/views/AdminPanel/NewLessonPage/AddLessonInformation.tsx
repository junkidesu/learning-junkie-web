import {
  Typography,
  Stack,
  Paper,
  TextField,
  Button,
  Container,
} from "@mui/material";
import React from "react";
import { Course } from "../../../types";

interface Props {
  course: Course;
  number: string;
  setNumber: React.Dispatch<React.SetStateAction<string>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  handleNext: () => void;
}

const AddLessonInformation = ({
  number,
  setNumber,
  title,
  setTitle,
  description,
  setDescription,
  handleNext,
}: Props) => {
  const onComplete = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleNext();
  };

  return (
    <Stack>
      <Paper sx={{ p: 2 }}>
        <Stack
          component="form"
          gap={4}
          sx={{
            p: 3,
            alignItems: "center",
          }}
          onSubmit={onComplete}
        >
          <Typography variant="h5">Lesson Information</Typography>

          <TextField
            variant="outlined"
            label="Number"
            required
            fullWidth
            helperText="Please the number of the lesson"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />

          <TextField
            variant="outlined"
            label="Title"
            required
            fullWidth
            helperText="Please the title of the lesson"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            variant="outlined"
            label="Description"
            required
            fullWidth
            multiline
            minRows={3}
            helperText="Please the description of the lesson"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Container>
            <Button variant="contained" sx={{ float: "right" }} type="submit">
              Next
            </Button>
          </Container>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default AddLessonInformation;
