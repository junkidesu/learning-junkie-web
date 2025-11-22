import {
  Stack,
  Divider,
  TextField,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Collapse,
  Button,
} from "@mui/material";
import AddEssay from "./AddEssay";
import AddTrueFalse from "./AddTrueFalse";
import AddTypeAnswer from "./AddTypeAnswer";
import { SetStateAction, useState } from "react";
import AddQuiz from "./AddQuiz";
import { Add, Close } from "@mui/icons-material";
import CustomNumberField from "../../../../components/custom/CustomNumberField";
import AddCoding from "./AddCoding";

const exerciseTypes = ["TypeAnswer", "TrueFalse", "Essay", "Quiz", "Coding"];

export type AddExerciseFormProps = {
  title: string;
  setTitle: React.Dispatch<SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<SetStateAction<string>>;
  maxGrade: number;
  setMaxGrade: React.Dispatch<SetStateAction<number>>;
  lessonId: number;
};

const AddExerciseForm = ({ lessonId }: { lessonId: number }) => {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [maxGrade, setMaxGrade] = useState<number>(0);

  const [exerciseType, setExerciseType] = useState(exerciseTypes[0]);

  return (
    <Stack alignItems="stretch" gap={2}>
      <Button
        variant="contained"
        onClick={() => setOpen(!open)}
        startIcon={open ? <Close /> : <Add />}
      >
        {open ? "Close" : "Add exercise"}
      </Button>

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

          <CustomNumberField
            label="Highest Grade"
            value={maxGrade}
            setValue={setMaxGrade}
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
              <MenuItem value="Coding">Coding</MenuItem>
            </Select>
          </FormControl>

          <Divider />

          {exerciseType === "TypeAnswer" && (
            <AddTypeAnswer
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
              maxGrade={Number(maxGrade)}
              setMaxGrade={setMaxGrade}
              lessonId={lessonId}
            />
          )}

          {exerciseType === "TrueFalse" && (
            <AddTrueFalse
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
              maxGrade={Number(maxGrade)}
              setMaxGrade={setMaxGrade}
              lessonId={lessonId}
            />
          )}

          {exerciseType === "Quiz" && (
            <AddQuiz
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
              maxGrade={Number(maxGrade)}
              setMaxGrade={setMaxGrade}
              lessonId={lessonId}
            />
          )}

          {exerciseType === "Essay" && (
            <AddEssay
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
              maxGrade={Number(maxGrade)}
              setMaxGrade={setMaxGrade}
              lessonId={lessonId}
            />
          )}

          {exerciseType === "Coding" && (
            <AddCoding
              title={title}
              setTitle={setTitle}
              description={description}
              setDescription={setDescription}
              maxGrade={Number(maxGrade)}
              setMaxGrade={setMaxGrade}
              lessonId={lessonId}
            />
          )}
        </Stack>
      </Collapse>
    </Stack>
  );
};

export default AddExerciseForm;
