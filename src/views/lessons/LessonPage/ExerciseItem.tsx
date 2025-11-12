import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Exercise } from "../../../types";
import { HistoryEdu, QuestionMark, Quiz, Rule } from "@mui/icons-material";
import useAuthUser from "../../../hooks/useAuthUser";
import { useState } from "react";

const ExerciseItem = ({ exercise }: { exercise: Exercise }) => {
  const [typedAnswer, setTypedAnswer] = useState<string>("");
  const [trueFalseAnswer, setTrueFalseAnswer] = useState("false");
  const [essayAnswer, setEssayAnswer] = useState("");
  const [quizAnswer, setQuizAnswer] = useState("A");

  const { authUser } = useAuthUser();

  const handleTrueFalseChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTrueFalseAnswer((event.target as HTMLInputElement).value);
  };

  const handleQuizChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuizAnswer((event.target as HTMLInputElement).value);
  };

  const handleAnswerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log();
  };

  return (
    <Paper square={false} elevation={3} sx={{ p: 2 }}>
      <Stack gap={2}>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" gap={2} alignItems="center">
            {exercise.content.tag === "TypeAnswer" && <QuestionMark />}
            {exercise.content.tag === "Quiz" && <Quiz />}
            {exercise.content.tag === "Essay" && <HistoryEdu />}
            {exercise.content.tag === "Coding" && <Rule />}

            <Typography variant="h6">{exercise.title}</Typography>
          </Stack>

          <Typography fontWeight="bold">
            Grade: 0/{exercise.maxGrade}
          </Typography>
        </Stack>

        <Typography component="span" color="text.secondary">
          {exercise.description}
        </Typography>

        <Divider />

        {exercise.content.tag === "TypeAnswer" && (
          <Stack
            component="form"
            gap={2}
            alignItems="start"
            onSubmit={handleAnswerSubmit}
          >
            <Typography>{exercise.content.question}</Typography>

            <TextField
              label="Answer"
              fullWidth
              helperText="Please enter the answer to the question"
              value={typedAnswer}
              onChange={(e) => setTypedAnswer(e.target.value)}
              disabled={!authUser}
            />

            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Stack>
        )}
        {exercise.content.tag === "Quiz" && (
          <Stack
            component="form"
            gap={2}
            alignItems="start"
            onSubmit={handleAnswerSubmit}
          >
            <Typography>{exercise.content.question}</Typography>

            <FormControl>
              <FormLabel>Choose the correct answer</FormLabel>
              <RadioGroup value={quizAnswer} onChange={handleQuizChange}>
                <FormControlLabel
                  value="A"
                  control={<Radio />}
                  label={`A: ${exercise.content.options.A}`}
                />
                <FormControlLabel
                  value="B"
                  control={<Radio />}
                  label={`B: ${exercise.content.options.B}`}
                />
                <FormControlLabel
                  value="C"
                  control={<Radio />}
                  label={`C: ${exercise.content.options.C}`}
                />
                <FormControlLabel
                  value="D"
                  control={<Radio />}
                  label={`D: ${exercise.content.options.D}`}
                />
              </RadioGroup>
            </FormControl>

            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Stack>
        )}
        {exercise.content.tag === "TrueFalse" && (
          <Stack
            component="form"
            gap={2}
            alignItems="start"
            onSubmit={handleAnswerSubmit}
          >
            <Typography>{exercise.content.question}</Typography>

            <FormControl>
              <FormLabel>Choose the correct answer</FormLabel>
              <RadioGroup
                row
                value={trueFalseAnswer}
                onChange={handleTrueFalseChange}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="True"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="False"
                />
              </RadioGroup>
            </FormControl>

            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Stack>
        )}

        {exercise.content.tag === "Essay" && (
          <Stack
            component="form"
            gap={2}
            alignItems="start"
            onSubmit={handleAnswerSubmit}
          >
            <Typography>{exercise.content.task}</Typography>

            <TextField
              multiline
              fullWidth
              minRows={4}
              value={essayAnswer}
              label="Essay Answer"
              helperText="Please provide the response to the essay task"
              onChange={(e) => setEssayAnswer(e.target.value)}
            />

            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Stack>
        )}
      </Stack>
    </Paper>
  );
};

export default ExerciseItem;
