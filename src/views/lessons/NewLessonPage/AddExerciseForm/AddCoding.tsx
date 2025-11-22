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
import React, { useState } from "react";
import { Environment, NewExercise } from "../../../../types";
import { useAddExerciseMutation } from "../../../../services/exercises.service";
import { AddExerciseFormProps } from ".";
import useAlert from "../../../../hooks/useAlert";
import Editor from "@monaco-editor/react";

const environmentToLanguage = (e: Environment): string => {
  if (e === Environment.Node) return "javascript";

  if (e === Environment.Python) return "python";

  return "c";
};

const AddCoding = ({
  title,
  setTitle,
  description,
  setDescription,
  maxGrade,
  setMaxGrade,
  lessonId,
}: AddExerciseFormProps) => {
  const { showAlert } = useAlert();
  const [environment, setEnvironment] = useState<Environment>(
    Environment.Haskell
  );
  const [requirements, setRequirements] = useState("");
  const [correctOutput, setCorrectOutput] = useState("");
  const [model, setModel] = useState("");

  const [addExercise] = useAddExerciseMutation();

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
      await addExercise({ id: lessonId, body }).unwrap();

      console.log("Success!");

      setTitle("");
      setDescription("");
      setMaxGrade(0);
      setRequirements("");
      setCorrectOutput("");

      showAlert({ message: "Successfully added essay!", severity: "success" });
    } catch (error) {
      console.error(error);
      showAlert({ message: "Could not add exercise :(", severity: "error" });
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

export default AddCoding;
