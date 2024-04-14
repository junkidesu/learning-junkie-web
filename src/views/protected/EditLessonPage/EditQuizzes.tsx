import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Lesson } from "../../../types";
import {
  useAddQuizMutation,
  useGetLessonQuizzesQuery,
} from "../../../services/lessons.service";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditQuizItem from "../../../components/exercises/EditQuizItem";

const EditQuizzes = ({ lesson }: { lesson: Lesson }) => {
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [optionA, setOptionA] = useState<string>("");
  const [optionB, setOptionB] = useState<string>("");
  const [optionC, setOptionC] = useState<string>("");
  const [optionD, setOptionD] = useState<string>("");
  const [correct, setCorrect] = useState<string>("A");
  const [grade, setGrade] = useState("");

  const { data: quizzes } = useGetLessonQuizzesQuery({
    id: lesson.course.id,
    number: lesson.number,
  });

  useNavigate();

  const [addQuiz] = useAddQuizMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log(question, optionA, optionB, optionC, optionD, correct);

      await addQuiz({
        lesson,
        body: {
          title: !title ? undefined : title,
          question,
          options: {
            A: optionA,
            B: optionB,
            C: optionC,
            D: optionD,
          },
          correct,
          grade: !grade ? undefined : Number(grade),
        },
      });

      console.log("Success!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Stack gap={2} sx={{ p: 2 }}>
      <Paper sx={{ p: 2 }} elevation={10}>
        <Stack gap={4} component="form" onSubmit={handleSubmit}>
          <Typography variant="h6">New Quiz</Typography>

          <TextField
            label="Title"
            helperText="Please enter the quiz title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextField
            label="Question"
            helperText="Please enter the question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />

          <FormControl required>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
              defaultValue="A"
              onChange={(e) => setCorrect(e.target.value)}
            >
              <Stack gap={4}>
                <Stack direction="row">
                  <FormControlLabel value="A" label="A" control={<Radio />} />

                  <TextField
                    label="Option A"
                    value={optionA}
                    onChange={(e) => setOptionA(e.target.value)}
                    required
                  />
                </Stack>

                <Stack direction="row">
                  <FormControlLabel value="B" label="B" control={<Radio />} />

                  <TextField
                    label="Option B"
                    value={optionB}
                    onChange={(e) => setOptionB(e.target.value)}
                    required
                  />
                </Stack>

                <Stack direction="row">
                  <FormControlLabel value="C" label="C" control={<Radio />} />

                  <TextField
                    label="Option C"
                    value={optionC}
                    onChange={(e) => setOptionC(e.target.value)}
                    required
                  />
                </Stack>

                <Stack direction="row">
                  <FormControlLabel value="D" label="D" control={<Radio />} />

                  <TextField
                    label="Option D"
                    value={optionD}
                    onChange={(e) => setOptionD(e.target.value)}
                    required
                  />
                </Stack>
              </Stack>
            </RadioGroup>
          </FormControl>

          <TextField
            label="Grade"
            helperText="Please enter the grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />

          <Container>
            <Button variant="contained" sx={{ float: "right" }} type="submit">
              Submit
            </Button>
          </Container>
        </Stack>
      </Paper>

      {quizzes && (
        <Stack gap={2}>
          <Typography variant="h6">Added Quizzes</Typography>

          {quizzes.length === 0 ? (
            <Typography>No quizzes so far!</Typography>
          ) : (
            quizzes.map((q) => <EditQuizItem key={q.id} quiz={q} />)
          )}
        </Stack>
      )}
    </Stack>
  );
};

export default EditQuizzes;
