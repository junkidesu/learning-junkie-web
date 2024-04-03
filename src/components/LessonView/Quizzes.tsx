import {
  Button,
  Card,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { Lesson } from "../../types";
import { useGetLessonQuizzesQuery } from "../../services/lessons.service";

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
        <Card variant="elevation" elevation={5} key={e.id}>
          <Stack gap={2} sx={{ p: 1 }}>
            <Stack direction="row">
              <Typography
                fontWeight="bold"
                fontStyle="italic"
                sx={{ flexGrow: 1 }}
              >
                {e.title || "Quiz"}
              </Typography>

              <Typography fontWeight="bold">
                {e.grade === 1 ? "1 point" : `${e.grade} points`}
              </Typography>
            </Stack>

            <Typography>{e.question}</Typography>

            <Container sx={{ width: "100%" }}>
              <Button sx={{ float: "right" }} variant="contained">
                Check
              </Button>
            </Container>
          </Stack>
        </Card>
      ))}
    </Stack>
  );
};

export default Quizzes;
