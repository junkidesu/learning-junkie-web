import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
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
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  console.log(matches);

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
          <MDEditor
            value={content}
            onChange={(val) => setContent(val!)}
            preview={matches ? "live" : "edit"}
          />
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
