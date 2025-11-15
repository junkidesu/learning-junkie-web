import {
  Container,
  Typography,
  Divider,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Button,
  SelectChangeEvent,
  Alert,
  Collapse,
  IconButton,
} from "@mui/material";
import { CloseTwoTone } from "@mui/icons-material";
import { useState, FormEvent, useEffect } from "react";
import { useEditCourseMutation } from "../../../services/courses.service";
import { Course, Difficulty } from "../../../types";
import useAlert from "../../../hooks/useAlert";

const EditCourseInformation = ({ course }: { course: Course }) => {
  const { showAlert } = useAlert();
  const [alertOpen, setAlertOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Beginner);
  const [exercisePercentage, setExercisePercentage] = useState<string>("");
  const [lessonPercentage, setLessonPercentage] = useState<string>("");

  const [editCourse] = useEditCourseMutation();

  const handleChange = (e: SelectChangeEvent<typeof difficulty>) => {
    setDifficulty(e.target.value as Difficulty);
  };

  const handleEditCourse = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      title,
      description,
      difficulty,
      completionRequirements: {
        lessonPercentage: Number(lessonPercentage),
        exercisePercentage: Number(exercisePercentage),
        finalProject: true,
      },
    };

    try {
      await editCourse({ id: course!.id, body }).unwrap();
      showAlert({
        severity: "success",
        message: "Edited course successfully!",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (course) {
      setTitle(course.title);
      setDescription(course.description);
      setDifficulty(course.difficulty);
      setLessonPercentage(
        course.completionRequirements.lessonPercentage.toString()
      );
      setExercisePercentage(
        course.completionRequirements.exercisePercentage.toString()
      );
    }
  }, [
    course,
    setTitle,
    setDescription,
    setLessonPercentage,
    setExercisePercentage,
  ]);

  return (
    <Container sx={{ p: 2 }}>
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
          Something went wrong!
        </Alert>
      </Collapse>
      <Typography variant="h5">{course.title}</Typography>

      <Divider />

      <Stack
        component="form"
        gap={4}
        sx={{ p: 3, alignItems: "end" }}
        onSubmit={handleEditCourse}
      >
        <TextField
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          label="Course Title"
          helperText="Please enter the name of the university"
        />

        <TextField
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          multiline
          minRows={3}
          label="Course Description"
          helperText="Please enter the name of the university"
        />

        <TextField
          fullWidth
          value={lessonPercentage}
          onChange={(e) => setLessonPercentage(e.target.value)}
          required
          label="Percentage of Lessons Required"
          helperText="Please enter the percentage of lessons required for completion"
        />

        <TextField
          fullWidth
          value={exercisePercentage}
          onChange={(e) => setExercisePercentage(e.target.value)}
          required
          label="Percentage of Lessons Required"
          helperText="Please enter the percentage of exercises required for completion"
        />

        <FormControl fullWidth required>
          <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={difficulty}
            label="Difficulty"
            onChange={handleChange}
            required
          >
            <MenuItem value={Difficulty.Beginner}>Beginner</MenuItem>
            <MenuItem value={Difficulty.Intermediate}>Intermediate</MenuItem>
            <MenuItem value={Difficulty.Advanced}>Advanced</MenuItem>
          </Select>
          <FormHelperText>
            Please select your level of difficulty
          </FormHelperText>
        </FormControl>

        <Button type="submit" variant="contained">
          Update
        </Button>
      </Stack>
    </Container>
  );
};

export default EditCourseInformation;
