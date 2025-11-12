import {
  Breadcrumbs,
  Container,
  Divider,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import CourseNavigation from "../../components/courses/CourseNavigation";
import { useNavigate, useParams } from "react-router-dom";
import { useGetLessonByIdQuery } from "../../services/lessons.service";
import MDEditor from "@uiw/react-md-editor";

const LessonPage = () => {
  const lessonId = useParams().id;

  const {
    data: lesson,
    isLoading,
    isError,
  } = useGetLessonByIdQuery(Number(lessonId), {
    skip: !lessonId,
  });

  const navigate = useNavigate();

  if (isLoading) return <Typography>Lesson Loading...</Typography>;

  if (isError || !lesson)
    return <Typography>Some error has occurred!</Typography>;

  return (
    <Container sx={{ display: "flex", flexDirection: "row" }}>
      <CourseNavigation activeLesson={lesson} course={lesson.chapter.course} />

      <Paper
        sx={{
          p: 2,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Breadcrumbs>
          <Link
            onClick={() => navigate(`/courses/${lesson.chapter.course.id}`)}
          >
            {lesson.chapter.course.title}
          </Link>

          <Typography>{lesson.chapter.title}</Typography>

          <Typography>{lesson.title}</Typography>
        </Breadcrumbs>

        <Divider />

        <Typography variant="h4">
          {lesson.number} {lesson.title}
        </Typography>

        <Divider />

        <Typography color="text.secondary">{lesson.description}</Typography>

        <Divider />

        {lesson.components.map((component) =>
          component.tag === "Markdown" ? (
            <MDEditor.Markdown
              key={component.content}
              style={{ backgroundColor: "transparent" }}
              source={component.content}
            />
          ) : (
            <Typography key={component.title}>Video</Typography>
          )
        )}
      </Paper>
    </Container>
  );
};

export default LessonPage;
