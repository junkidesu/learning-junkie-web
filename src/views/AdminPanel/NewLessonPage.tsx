import { CloseTwoTone } from "@mui/icons-material";
import {
  Alert,
  Button,
  Collapse,
  Container,
  FormControl,
  FormHelperText,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FormEvent, useState } from "react";
import { useGetCourseByIdQuery } from "../../services/courses.service";
import { useParams } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import { useAddLessonMutation } from "../../services/lessons.service";

const NewLessonPage = () => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [number, setNumber] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const courseId = useParams().id;

  const {
    data: course,
    isLoading,
    isError,
  } = useGetCourseByIdQuery(Number(courseId), {
    skip: !courseId,
  });

  const [addLesson] = useAddLessonMutation();

  if (isLoading) return <Typography>Loading...</Typography>;

  if (isError || !course)
    return <Typography>Some error has occurred!</Typography>;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await addLesson({
      id: course.id,
      body: {
        number: Number(number),
        title,
        description,
        content,
      },
    });
  };

  return (
    <Container>
      <Collapse in={alertOpen}>
        <Alert
          severity="error"
          variant="filled"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setAlertOpen(false);
              }}
            >
              <CloseTwoTone fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Something went wrong :(
        </Alert>
      </Collapse>

      <Stack>
        <Paper sx={{ p: 2 }}>
          <Stack
            component="form"
            gap={4}
            sx={{
              p: 3,
              alignItems: "center",
            }}
            onSubmit={handleSubmit}
          >
            <Typography variant="h5">
              Add a Lesson to "{course.title}"
            </Typography>

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

            <FormControl>
              <MDEditor
                value={content}
                onChange={(v) => (v ? setContent(v) : console.log())}
              />
              <FormHelperText>
                Please enter the content of the lesson
              </FormHelperText>
            </FormControl>

            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
};

export default NewLessonPage;
