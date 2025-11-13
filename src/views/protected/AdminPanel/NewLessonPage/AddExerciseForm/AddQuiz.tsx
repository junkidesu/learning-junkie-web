import {
  Stack,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { NewExercise } from "../../../../../types";
import { useAddExerciseMutation } from "../../../../../services/exercises.service";

type Option = "A" | "B" | "C" | "D";

const AddQuiz = ({
  title,
  description,
  maxGrade,
  lessonId,
}: {
  title: string;
  description: string;
  maxGrade: number;
  lessonId: number;
}) => {
  const [question, setQuestion] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [optionC, setOptionC] = useState("");
  const [optionD, setOptionD] = useState("");
  const [correctOption, setCorrectOption] = useState<Option>("A");

  const [addExercise] = useAddExerciseMutation();

  const handleQuizChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCorrectOption((event.target as HTMLInputElement).value as Option);
  };

  const handleAnswerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body: NewExercise = {
      title,
      description,
      maxGrade,
      content: {
        tag: "Quiz",
        question,
        options: { A: optionA, B: optionB, C: optionC, D: optionD },
        correctOption,
      },
    };

    try {
      await addExercise({ id: lessonId, body }).unwrap();

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
      <TextField
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
        label="Question"
        helperText="Please answer the exercise question"
        fullWidth
      />

      <FormControl
        fullWidth
        sx={{ display: "flex", flexDirection: "column", alignItems: "stretch" }}
      >
        <FormLabel>Assign the correct answer</FormLabel>
        <RadioGroup
          value={correctOption}
          onChange={handleQuizChange}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "stretch",
          }}
        >
          <FormControlLabel
            value="A"
            control={<Radio />}
            label={
              <TextField
                value={optionA}
                onChange={(e) => setOptionA(e.target.value)}
                label="Option A"
                helperText="Please enter the option A"
                required
                fullWidth
              />
            }
            sx={{ width: "100%" }}
          />
          <FormControlLabel
            value="B"
            control={<Radio />}
            label={
              <TextField
                value={optionB}
                onChange={(e) => setOptionB(e.target.value)}
                label="Option B"
                helperText="Please enter the option B"
                required
                fullWidth
              />
            }
            sx={{ width: "100%" }}
          />
          <FormControlLabel
            value="C"
            control={<Radio />}
            label={
              <TextField
                value={optionC}
                onChange={(e) => setOptionC(e.target.value)}
                label="Option C"
                helperText="Please enter the option C"
                required
                fullWidth
              />
            }
            sx={{ width: "100%" }}
          />
          <FormControlLabel
            value="D"
            control={<Radio />}
            label={
              <TextField
                value={optionD}
                onChange={(e) => setOptionD(e.target.value)}
                label="Option D"
                helperText="Please enter the option D"
                required
                fullWidth
              />
            }
            sx={{ width: "100%" }}
          />
        </RadioGroup>
      </FormControl>

      <Button variant="contained" type="submit">
        Submit
      </Button>
    </Stack>
  );
};

export default AddQuiz;
