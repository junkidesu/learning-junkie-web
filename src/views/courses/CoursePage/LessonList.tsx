import { useNavigate } from "react-router-dom";
import { useGetChapterLessonsQuery } from "../../../services/lessons.service";
import { Chapter } from "../../../types";
import { List, Typography } from "@mui/material";

const LessonList = ({ chapter }: { chapter: Chapter }) => {
  const {
    data: lessons,
    isLoading,
    isError,
  } = useGetChapterLessonsQuery({
    id: chapter.course.id,
    chapterNumber: chapter.number,
  });
  const navigate = useNavigate();

  if (isLoading) return <Typography>Loading...</Typography>;

  if (isError || !lessons)
    return <Typography>Some error has occurred!</Typography>;

  return <List></List>;
};

export default LessonList;
