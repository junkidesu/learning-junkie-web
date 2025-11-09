import { Breadcrumbs, Container, Link, Typography } from "@mui/material";
import CourseNavigation from "../../components/courses/CourseNavigation";
import { useNavigate, useParams } from "react-router-dom";
import { useGetLessonByIdQuery } from "../../services/lessons.service";
import Markdown from "react-markdown";

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

      <Container sx={{ width: "100%" }}>
        <Breadcrumbs>
          <Link
            onClick={() => navigate(`/courses/${lesson.chapter.course.id}`)}
          >
            {lesson.chapter.course.title}
          </Link>

          <Typography>{lesson.chapter.title}</Typography>

          <Typography>{lesson.title}</Typography>
        </Breadcrumbs>

        <Typography>{lesson.title}</Typography>

        {lesson.components.map((component) =>
          component.tag === "Markdown" ? (
            <Markdown key={component.content}>{component.content}</Markdown>
          ) : (
            <Typography key={component.title}>Video</Typography>
          )
        )}
      </Container>
    </Container>
  );
};

export default LessonPage;
