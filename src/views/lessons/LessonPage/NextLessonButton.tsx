import { Button, Typography } from "@mui/material";
import { useGetChaptersByCourseIdQuery } from "../../../services/chapter.service";
import { useGetChapterLessonsQuery } from "../../../services/lessons.service";
import { Lesson } from "../../../types";
import React from "react";
import { useNavigate } from "react-router-dom";
import NextChapterButton from "./NextChapterButton";

const NextLessonButton = ({
  lesson,
  setActiveStep,
}: {
  lesson: Lesson;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { data: lessons, isLoading: lessonsLoading } =
    useGetChapterLessonsQuery({
      id: lesson.chapter.course.id,
      chapterNumber: lesson.chapter.number,
    });

  const { data: chapters, isLoading: chaptersLoading } =
    useGetChaptersByCourseIdQuery(lesson.chapter.course.id);

  const navigate = useNavigate();

  if (lessonsLoading || chaptersLoading)
    return <Button disabled>Loading...</Button>;

  if (!chapters || !lessons) return <Typography>Error!</Typography>;

  const nextLesson = lessons.find((l) => l.number === lesson.number + 1);

  const nextChapter = chapters.find(
    (c) => c.number === lesson.chapter.number + 1
  );

  return (
    <React.Fragment>
      {nextLesson ? (
        <Button
          onClick={() => {
            navigate(`/lessons/${nextLesson.id}`);
            setActiveStep(0);
          }}
        >
          Next Lesson
        </Button>
      ) : nextChapter ? (
        <NextChapterButton
          chapter={nextChapter}
          setActiveStep={setActiveStep}
        />
      ) : (
        <Button
          onClick={() => navigate(`/courses/${lesson.chapter.course.id}`)}
        >
          Course Page
        </Button>
      )}
    </React.Fragment>
  );
};

export default NextLessonButton;
