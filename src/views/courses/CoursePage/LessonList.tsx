import { Container, List, Typography } from "@mui/material";
import { Chapter } from "../../../types";
import { useGetChapterLessonsQuery } from "../../../services/lessons.service";
import LessonItem from "./LessonItem";

const LessonList = ({ chapter }: { chapter: Chapter }) => {
  const {
    data: lessons,
    isLoading,
    isError,
  } = useGetChapterLessonsQuery({
    id: chapter.course.id,
    chapterNumber: chapter.number,
  });

  if (isLoading) return <Typography>Loading...</Typography>;

  if (isError || !lessons)
    return <Typography>Some error has occurred!</Typography>;

  return (
    <Container>
      <List component="nav">
        {lessons.map((lesson) => (
          <LessonItem key={lesson.id} lesson={lesson} />
        ))}
      </List>
    </Container>
  );
};

export default LessonList;
