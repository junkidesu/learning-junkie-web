import { List, Typography } from "@mui/material";
import { useGetChapterLessonsQuery } from "../../../../services/lessons.service";
import { Chapter } from "../../../../types";
import EditCourseLessonItem from "./EditCourseLessonItem";

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

  return (
    <List component="nav">
      {lessons.map((lesson) => (
        <EditCourseLessonItem key={lesson.id} lesson={lesson} />
      ))}
    </List>
  );
};

export default EditCourseLessonList;
