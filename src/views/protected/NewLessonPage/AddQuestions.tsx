import {
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Lesson } from "../../../types";
import {
  useAddQuestionMutation,
  useGetLessonQuestionsQuery,
} from "../../../services/lessons.service";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditQuestionItem from "../../../components/exercises/EditQuestionItem";

const AddQuestions = ({ lesson }: { lesson: Lesson }) => {
  const [title, setTitle] = useState("");
  const [question, setQuesiton] = useState("");
  const [answer, setAnswer] = useState("");
  const [grade, setGrade] = useState("");

  const { data: questions } = useGetLessonQuestionsQuery({
    id: lesson.course.id,
    number: lesson.number,
  });

  const navigate = useNavigate();

  const [addQuestion] = useAddQuestionMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await addQuestion({
      lesson,
      body: {
        title,
        question,
        answer,
        grade: Number(grade),
      },
    });
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Stack gap={2}>
        <Paper sx={{ p: 2 }} elevation={5}>
          <Stack gap={4} component="form" onSubmit={handleSubmit}>
            <Typography variant="h6">New Question</Typography>

            <TextField
              label="Title"
              helperText="Please enter the question title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <TextField
              label="Question"
              helperText="Please enter the question"
              value={question}
              onChange={(e) => setQuesiton(e.target.value)}
              required
            />

            <TextField
              label="Answer"
              helperText="Please enter the answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />

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

        {questions && (
          <Stack gap={2}>
            <Typography variant="h6">Added Questions</Typography>

            {questions.length === 0 ? (
              <Typography>No questions so far!</Typography>
            ) : (
              questions.map((q) => <EditQuestionItem key={q.id} question={q} />)
            )}
          </Stack>
        )}
        <Container>
          <Button
            color="success"
            variant="contained"
            sx={{ float: "right" }}
            onClick={() => navigate(`/courses/${lesson.course.id}/lessons/edit`)}
          >
            Finish
          </Button>
        </Container>
      </Stack>
    </Paper>
  );
};

export default AddQuestions;
