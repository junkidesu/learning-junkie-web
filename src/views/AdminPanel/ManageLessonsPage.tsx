import { Button, Container, Paper, Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCourseByIdQuery } from "../../services/courses.service";
import { useGetCourseLessonsQuery } from "../../services/lessons.service";
import LessonItem from "./LessonItem";

const ManageLessonsPage = () => {
  const courseId = useParams().id;

  const navigate = useNavigate();

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

          <Container>
            <Button
              variant="contained"
              sx={{ float: "right" }}
              onClick={() => navigate(`/courses/${course.id}/lessons/new`)}
            >
              Add Lesson
            </Button>
          </Container>
        </Stack>
      </Paper>
    </Container>
  );
};

export default ManageLessonsPage;
