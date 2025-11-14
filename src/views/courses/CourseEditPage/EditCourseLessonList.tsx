import { List, Typography } from "@mui/material";
import EditCourseLessonItem from "./EditCourseLessonItem";
import { useGetChapterLessonsQuery } from "../../../services/lessons.service";
import { Chapter } from "../../../types";

const EditCourseLessonList = ({ chapter }: { chapter: Chapter }) => {
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

  const sortedLessons = lessons.slice().sort((l1, l2) => l1.number - l2.number);

  return (
    <List component="nav">
      {sortedLessons.map((lesson) => (
        <EditCourseLessonItem key={lesson.id} lesson={lesson} />
      ))}
    </List>
  );
};

export default EditCourseLessonList;
