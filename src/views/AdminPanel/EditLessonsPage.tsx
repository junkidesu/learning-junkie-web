import { Container, Paper, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetCourseByIdQuery } from "../../services/courses.service";
import { useGetCourseLessonsQuery } from "../../services/lessons.service";
import LessonItem from "./LessonItem";

const EditLessonsPage = () => {
  const courseId = useParams().id;

  const { data: course, isLoading: courseLoading } = useGetCourseByIdQuery(
    Number(courseId),
    {
      skip: !courseId,
    }
  );

  const { data: lessons, isLoading: lessonsLoading } = useGetCourseLessonsQuery(
    Number(courseId),
    {
      skip: !courseId,
    }
  );

  if (!courseId) return null;

  if (courseLoading || lessonsLoading)
    return <Typography>Loading...</Typography>;

  if (!course || !lessons)
    return <Typography>Some error has occurred!</Typography>;

  return (
    <Container>
      <Paper sx={{ p: 2 }}>
        <Stack gap={2}>
          {lessons.map((l) => (
            <LessonItem lesson={l} key={l.number} />
          ))}
        </Stack>
      </Paper>
    </Container>
  );
};

export default EditLessonsPage;
