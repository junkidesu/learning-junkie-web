import { Button, Typography } from "@mui/material";
import { useGetChapterLessonsQuery } from "../../../services/lessons.service";
import { Chapter } from "../../../types";
import { useNavigate } from "react-router-dom";

const NextChapterButton = ({
  chapter,
  setActiveStep,
}: {
  chapter: Chapter;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const {
    data: lessons,
    isLoading,
    isError,
  } = useGetChapterLessonsQuery({
    id: chapter.course.id,
    chapterNumber: chapter.number,
  });

  const navigate = useNavigate();

  if (isLoading) return <Button disabled>Next Chapter</Button>;

  if (isError || !lessons) return <Typography>Error!</Typography>;

  const firstLesson = lessons.find((l) => l.number === 1);

  if (!firstLesson) return <Typography>Error!</Typography>;

  return (
    <Button
      onClick={() => {
        navigate(`/lessons/${firstLesson?.id}`);
        setActiveStep(0);
      }}
    >
      Next Chapter
    </Button>
  );
};

export default NextChapterButton;
