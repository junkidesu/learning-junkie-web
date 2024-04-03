import {
  Stack,
  Typography,
} from "@mui/material";
import { Lesson } from "../../types";
import { useGetLessonQuestionsQuery } from "../../services/lessons.service";
import QuestionItem from "./QuestionItem";

const Questions = ({ lesson }: { lesson: Lesson }) => {
  const {
    data: questions,
    isLoading,
    isError,
  } = useGetLessonQuestionsQuery({
    id: lesson.course.id,
    number: lesson.number,
  });

  if (isLoading) return <Typography>Loading ...</Typography>;

  if (!questions || isError)
    return <Typography>Some error has occurred!</Typography>;

  return (
    <Stack gap={2}>
      {questions.map((e) => (
        <QuestionItem key={e.id} question={e} />
      ))}
    </Stack>
  );
};

export default Questions;
