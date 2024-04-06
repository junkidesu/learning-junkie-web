import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Course } from "../../../types";
import MDEditor from "@uiw/react-md-editor";
import React from "react";

interface Props {
  course: Course;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleBack: () => void;
}

const AddLessonContent = ({
  content,
  setContent,
  handleSubmit,
  handleBack,
}: Props) => {
  return (
    <Paper sx={{ p: 2 }}>
      <Stack
        gap={4}
        sx={{ alignItems: "center" }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Typography variant="h5">Lesson Content</Typography>

        <FormControl required fullWidth>
          <MDEditor value={content} onChange={(val) => setContent(val!)} />
          <FormHelperText>
            Please enter the markdown content of the lesson
          </FormHelperText>
        </FormControl>

        <Container>
          <Button variant="contained" onClick={handleBack}>
            Back
          </Button>

          <Button variant="contained" sx={{ float: "right" }} type="submit">
            Submit
          </Button>
        </Container>
      </Stack>
    </Paper>
  );
};

export default AddLessonContent;
