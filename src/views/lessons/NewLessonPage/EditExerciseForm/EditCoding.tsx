import {
  Stack,
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useEditExerciseMutation } from "../../../../services/exercises.service";
import { Environment, Exercise, NewExercise } from "../../../../types";
import Editor from "@monaco-editor/react";

const environmentToLanguage = (e: Environment): string => {
  if (e === Environment.Node) return "javascript";

  if (e === Environment.Python) return "python";

  return "c";
};

const EditCoding = ({
  exercise,
  title,
  description,
  maxGrade,
}: {
  title: string;
  description: string;
  maxGrade: number;
  exercise: Exercise;
}) => {
  const [environment, setEnvironment] = useState<Environment>(
    exercise.content.tag === "Coding"
      ? exercise.content.environment
      : Environment.Haskell
  );
  const [requirements, setRequirements] = useState(
    exercise.content.tag === "Coding" ? exercise.content.requirements : ""
  );
  const [correctOutput, setCorrectOutput] = useState("");
  const [model, setModel] = useState("");

  const [editExercise] = useEditExerciseMutation();

  const handleAnswerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body: NewExercise = {
      title,
      description,
      maxGrade,
      content: {
        tag: "Coding",
        environment,
        requirements,
        correctOutput,
        model,
      },
    };

    try {
      await editExercise({ id: exercise.id, body }).unwrap();

      console.log("Success!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Stack
      component="form"
      gap={2}
      alignItems="start"
      onSubmit={handleAnswerSubmit}
    >
      <FormControl fullWidth required>
        <InputLabel id="exercise-type-id">Exercise Type</InputLabel>
        <Select
          labelId="exercise-type-id"
          value={environment}
          label="Exercise Type"
          onChange={(e) => setEnvironment(e.target.value as Environment)}
        >
          <MenuItem value={Environment.Haskell}>Haskell</MenuItem>
          <MenuItem value={Environment.Node}>Node</MenuItem>
          <MenuItem value={Environment.Python}>Python</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        value={requirements}
        label="Requirements"
        helperText="Please enter the coding exercise requirements"
        onChange={(e) => setRequirements(e.target.value)}
        required
      />

      <TextField
        multiline
        fullWidth
        minRows={4}
        value={correctOutput}
        label="Correct Output"
        helperText="Please provide the correct output for the coding exercise"
        onChange={(e) => setCorrectOutput(e.target.value)}
        required
      />

      <Stack
        sx={{ width: "100%", height: "fit-content" }}
        border={1}
        borderRadius={1}
        borderColor="InactiveBorder"
        p={1}
        gap={1}
      >
        <Typography color="text.secondary">Model Solution</Typography>
        <Editor
          className="model-solution"
          height="200px"
          language={environmentToLanguage(environment)}
          theme="vs-dark"
          value={model}
          onChange={(e) => setModel(e!)}
        />
      </Stack>

      <Button variant="contained" type="submit">
        Submit
      </Button>
    </Stack>
  );
};

export default EditCoding;
