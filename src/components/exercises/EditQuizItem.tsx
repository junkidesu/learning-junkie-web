import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Quiz } from "../../types";
import { useState } from "react";
import { useEditQuizMutation } from "../../services/exercises.service";

const EditQuizItem = ({ quiz }: { quiz: Quiz }) => {
  const [newQuestion, setNewQuestion] = useState(quiz.question);
  const [newOptionA, setNewOptionA] = useState(quiz.options.A);
  const [newOptionB, setNewOptionB] = useState(quiz.options.B);
  const [newOptionC, setNewOptionC] = useState(quiz.options.C);
  const [newOptionD, setNewOptionD] = useState(quiz.options.D);
  const [newCorrect, setNewCorrect] = useState("");

  const [editQuiz] = useEditQuizMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Updating a quiz");

    try {
      await editQuiz({
        id: quiz.id,
        body: {
          question: newQuestion,
          options: {
            A: newOptionA,
            B: newOptionB,
            C: newOptionC,
            D: newOptionD,
          },
          correct: newCorrect,
        },
      });

      console.log("Success!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Paper sx={{ p: 2 }} elevation={10}>
      <Stack gap={4} component="form" onSubmit={handleSubmit}>
        <Stack direction="row">
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {quiz.title}
          </Typography>
          <Typography>Grade: {quiz.grade}</Typography>
        </Stack>

        <TextField
          label="Question"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
        />

        <FormControl required>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            defaultValue="A"
            onChange={(e) => setNewCorrect(e.target.value)}
          >
            <Stack gap={4}>
              <Stack direction="row">
                <FormControlLabel value="A" label="A" control={<Radio />} />

                <TextField
                  label="Option A"
                  value={newOptionA}
                  onChange={(e) => setNewOptionA(e.target.value)}
                  required
                />
              </Stack>

              <Stack direction="row">
                <FormControlLabel value="B" label="B" control={<Radio />} />

                <TextField
                  label="Option B"
                  value={newOptionB}
                  onChange={(e) => setNewOptionB(e.target.value)}
                  required
                />
              </Stack>

              <Stack direction="row">
                <FormControlLabel value="C" label="C" control={<Radio />} />

                <TextField
                  label="Option C"
                  value={newOptionC}
                  onChange={(e) => setNewOptionC(e.target.value)}
                  required
                />
              </Stack>

              <Stack direction="row">
                <FormControlLabel value="D" label="D" control={<Radio />} />

                <TextField
                  label="Option D"
                  value={newOptionD}
                  onChange={(e) => setNewOptionD(e.target.value)}
                  required
                />
              </Stack>
            </Stack>
          </RadioGroup>
        </FormControl>

        <Divider />

        <Stack direction="row">
          <Button type="submit">Update</Button>
          <Button color="error">Delete</Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default EditQuizItem;
