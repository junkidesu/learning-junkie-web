import { Stack, Typography } from "@mui/material";
import { Lesson } from "../../types";
import { useGetLessonQuizzesQuery } from "../../services/lessons.service";
import QuizItem from "./QuizItem";

const Quizzes = ({ lesson }: { lesson: Lesson }) => {
  const {
    data: quizzes,
    isLoading,
    isError,
  } = useGetLessonQuizzesQuery({
    id: lesson.course.id,
    number: lesson.number,
  });

  if (isLoading) return <Typography>Loading ...</Typography>;

  if (!quizzes || isError)
    return <Typography>Some error has occurred!</Typography>;

  return (
    <Stack gap={2}>
      {quizzes.map((e) => (
        <QuizItem key={e.id} quiz={e} />
      ))}
    </Stack>
  );
};

export default Quizzes;
