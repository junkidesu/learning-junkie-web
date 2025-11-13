import {
  Stack,
  Divider,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";
import AddEssay from "./AddEssay";
import AddTrueFalse from "./AddTrueFalse";
import AddTypeAnswer from "./AddTypeAnswer";
import { useState } from "react";
import AddQuiz from "./AddQuiz";

const exerciseTypes = ["TypeAnswer", "TrueFalse", "Essay", "Quiz"];

const AddExerciseForm = ({ lessonId }: { lessonId: number }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [maxGrade, setMaxGrade] = useState<string>("");

  const [exerciseType, setExerciseType] = useState(exerciseTypes[0]);

  return (
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
          onChange={(e) => setExerciseType(e.target.value)}
        >
          <MenuItem value="TypeAnswer">Question</MenuItem>
          <MenuItem value="TrueFalse">True/False</MenuItem>
          <MenuItem value="Essay">Essay</MenuItem>
          <MenuItem value="Quiz">Quiz</MenuItem>
        </Select>
      </FormControl>
      <Divider />

      {exerciseType === "TypeAnswer" && (
        <AddTypeAnswer
          title={title}
          description={description}
          maxGrade={Number(maxGrade)}
          lessonId={lessonId}
        />
      )}

      {exerciseType === "TrueFalse" && (
        <AddTrueFalse
          title={title}
          description={description}
          maxGrade={Number(maxGrade)}
          lessonId={lessonId}
        />
      )}
      {exerciseType === "Quiz" && (
        <AddQuiz
          title={title}
          description={description}
          maxGrade={Number(maxGrade)}
          lessonId={lessonId}
        />
      )}

      {exerciseType === "Essay" && (
        <AddEssay
          title={title}
          description={description}
          maxGrade={Number(maxGrade)}
          lessonId={lessonId}
        />
      )}
    </Stack>
  );
};

export default AddExerciseForm;
