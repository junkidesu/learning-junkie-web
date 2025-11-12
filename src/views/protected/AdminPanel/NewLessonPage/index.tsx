import { useParams } from "react-router-dom";
import { useGetChapterByNumberQuery } from "../../../../services/chapter.service";
import { Divider, Paper, Typography } from "@mui/material";
import NewLessonForm from "./NewLessonForm";
import { useGetChapterLessonsQuery } from "../../../../services/lessons.service";

const NewLessonPage = () => {
  const courseId = useParams().id;
  const chapterNumber = useParams().chapterNumber;

  const {
    data: chapter,
    isLoading,
    isError,
  } = useGetChapterByNumberQuery(
    {
      id: Number(courseId),
      chapterNumber: Number(chapterNumber),
    },
    { skip: !courseId || !chapterNumber }
  );

  const {
    data: lessons,
    isLoading: lessonsLoading,
    isError: lessonsError,
  } = useGetChapterLessonsQuery(
    {
      id: Number(courseId!),
      chapterNumber: Number(chapterNumber),
    },
    { skip: !courseId || !chapterNumber }
  );

  if (isLoading || lessonsLoading) return <Typography>Loading...</Typography>;

  if (isError || lessonsError || !chapter || !lessons)
    return <Typography>Some error has occurred!</Typography>;

  if (!courseId || !chapterNumber) return null;

  const lastLessonNumber =
    lessons.length === 0
      ? 0
      : Math.max(...lessons.map((lesson) => lesson.number));
  return (
    <Paper
      square={false}
      sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Typography variant="h5">New Lesson</Typography>
      <Divider />

      <NewLessonForm
        chapter={chapter}
        lastLessonNumber={Number(lastLessonNumber)}
      />
    </Paper>
  );
};

export default NewLessonPage;
