import {
  Stack,
  Divider,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Collapse,
  Typography,
  IconButton,
} from "@mui/material";
import EditEssay from "./EditEssay";
import EditTrueFalse from "./EditTrueFalse";
import EditTypeAnswer from "./EditTypeAnswer";
import { useState } from "react";
import EditQuiz from "./EditQuiz";
import { Exercise } from "../../../../types";
import { Close, Delete, Edit } from "@mui/icons-material";
import { useDeleteExerciseMutation } from "../../../../services/exercises.service";

type ExerciseType = "TypeAnswer" | "TrueFalse" | "Essay" | "Quiz";

const EditExerciseForm = ({ exercise }: { exercise: Exercise }) => {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState<string>(exercise.title);
  const [description, setDescription] = useState<string>(exercise.description);
  const [maxGrade, setMaxGrade] = useState<string>(
    exercise.maxGrade.toString()
  );
  const [exerciseType, setExerciseType] = useState(exercise.content.tag);

  const [deleteExercise] = useDeleteExerciseMutation();

  const handleDelete = async () => {
    try {
      await deleteExercise(exercise.id);
      console.log("Success!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Paper square={false} elevation={3} sx={{ p: 2 }}>
      <Stack gap={2}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography>Exercise: {exercise.title}</Typography>

          <Stack direction="row">
            <IconButton onClick={() => setOpen(!open)}>
              {open ? <Close /> : <Edit />}
            </IconButton>

            <IconButton onClick={handleDelete}>
              <Delete />
            </IconButton>
          </Stack>
        </Stack>

        <Collapse in={open}>
          <Stack gap={2}>
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              label="Title"
              helperText="Please enter the title of the exercise"
              required
            />

            <TextField
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              label="Description"
              helperText="Please enter the description for the exercise"
              required
            />

            <TextField
              value={maxGrade}
              onChange={(e) => setMaxGrade(e.target.value)}
              label="Highest Grade"
              helperText="Please enter the highest grade of the exercise"
              required
            />

            <FormControl fullWidth required>
              <InputLabel id="exercise-type-id">Exercise Type</InputLabel>
              <Select
                labelId="exercise-type-id"
                value={exerciseType}
                label="Exercise Type"
                onChange={(e) =>
                  setExerciseType(e.target.value as ExerciseType)
                }
              >
                <MenuItem value="TypeAnswer">Question</MenuItem>
                <MenuItem value="TrueFalse">True/False</MenuItem>
                <MenuItem value="Essay">Essay</MenuItem>
                <MenuItem value="Quiz">Quiz</MenuItem>
              </Select>
            </FormControl>
            <Divider />

            {exerciseType === "TypeAnswer" && (
              <EditTypeAnswer
                title={title}
                description={description}
                maxGrade={Number(maxGrade)}
                exercise={exercise}
              />
            )}

            {exerciseType === "TrueFalse" && (
              <EditTrueFalse
                title={title}
                description={description}
                maxGrade={Number(maxGrade)}
                exercise={exercise}
              />
            )}
            {exerciseType === "Quiz" && (
              <EditQuiz
                title={title}
                description={description}
                maxGrade={Number(maxGrade)}
                exercise={exercise}
              />
            )}

            {exerciseType === "Essay" && (
              <EditEssay
                title={title}
                description={description}
                maxGrade={Number(maxGrade)}
                exercise={exercise}
              />
            )}
          </Stack>
        </Collapse>
      </Stack>
    </Paper>
  );
};

export default EditExerciseForm;
