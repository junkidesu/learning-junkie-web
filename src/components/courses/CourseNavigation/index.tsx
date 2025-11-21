import {
  Button,
  Collapse,
  Container,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useGetChaptersByCourseIdQuery } from "../../../services/chapter.service";
import React, { useState } from "react";
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

  const [visible, setVisible] = useState<boolean>(false);

  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.down("md"));

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
    <Paper
      square={false}
      sx={{
        p: 2,
        maxWidth: { md: "300px" },
        width: "100%",
      }}
    >
      <Button
        sx={{ display: { md: "none" } }}
        variant="contained"
        fullWidth
        onClick={() => setVisible(!visible)}
      >
        Course navigation
      </Button>
      <Collapse in={!matches || visible}>
        <List
          component="nav"
          sx={{}}
          subheader={
            <ListSubheader sx={{ backgroundColor: "transparent" }}>
              <Typography>Course Chapters and Lessons</Typography>
            </ListSubheader>
          }
        >
          {chapters.map((chapter) => (
            <React.Fragment
              key={chapter.course.id.toString() + chapter.number.toString()}
            >
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
            </React.Fragment>
          ))}
        </List>
      </Collapse>
    </Paper>
  );
};

export default CourseNavigation;
