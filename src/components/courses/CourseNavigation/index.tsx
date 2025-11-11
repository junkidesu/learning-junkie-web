import {
  Collapse,
  Container,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import { useGetChaptersByCourseIdQuery } from "../../../services/chapter.service";
import { useState } from "react";
import { Class } from "@mui/icons-material";
import ChapterLessons from "./ChapterLessons";
import { Course, Lesson } from "../../../types";

const CourseNavigation = ({
  course,
  activeLesson,
}: {
  course: Course;
  activeLesson: Lesson;
}) => {
  const [open, setOpen] = useState<string | boolean>(
    activeLesson.chapter.title
  );

  const handleChange = (item: string) => () => {
    setOpen(item === open ? false : item);
  };

  const {
    data: chapters,
    isLoading,
    isError,
  } = useGetChaptersByCourseIdQuery(Number(course.id), { skip: !course.id });

  if (isLoading) return <Container>Loading...</Container>;

  if (isError || !chapters)
    return <Container>Some issue has occurred!</Container>;

  return (
    <List
      component="nav"
      sx={{ maxWidth: "300px", width: "100%" }}
      subheader={
        <ListSubheader>
          <Typography>Course Chapters and Lessons</Typography>
        </ListSubheader>
      }
    >
      {chapters.map((chapter) => (
        <>
          <ListItemButton onClick={handleChange(chapter.title)}>
            <ListItemIcon>
              <Class />
            </ListItemIcon>
            <ListItemText>
              <Typography>
                {chapter.number} {chapter.title}
              </Typography>
            </ListItemText>
          </ListItemButton>
          <Collapse in={chapter.title == open}>
            <ChapterLessons chapter={chapter} />
          </Collapse>
        </>
      ))}
    </List>
  );
};

export default CourseNavigation;
