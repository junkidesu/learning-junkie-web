import {
  Collapse,
  Container,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { Course } from "../../../types";
import { useGetChaptersByCourseIdQuery } from "../../../services/chapter.service";
import { useState } from "react";
import LessonList from "./LessonList";

const CourseChapters = ({ course }: { course: Course }) => {
  const {
    data: chapters,
    isLoading,
    isError,
  } = useGetChaptersByCourseIdQuery(course.id);
  const [open, setOpen] = useState<string | boolean>(false);

  const handleChange = (panel: string) => () => {
    setOpen(panel === open ? false : panel);
  };

  if (isLoading) return <Typography>Loading chapters...</Typography>;

  if (isError || !chapters)
    return <Typography>Some error has occurred!</Typography>;

  return (
    <Paper square={false} sx={{ mb: 2 }}>
      <Container sx={{ p: 2 }}>
        <Typography variant="h5">Course Syllabus</Typography>
      </Container>

      <Divider />

      <List component="nav" id="chapters-and-lessons" sx={{ width: "100%" }}>
        {chapters.map((chapter) => (
          <>
            <ListItemButton
              key={chapter.number}
              onClick={handleChange(chapter.title)}
            >
              <ListItemText>
                <Typography component="span" fontSize={20} variant="h6">
                  Chapter {chapter.number} {chapter.title}
                </Typography>
                <Typography component="div" sx={{ color: "text.secondary" }}>
                  {chapter.description}
                </Typography>
              </ListItemText>
            </ListItemButton>
            <Collapse in={chapter.title === open} sx={{ p: 0 }}>
              <LessonList chapter={chapter} />
            </Collapse>
          </>
        ))}
      </List>
    </Paper>
  );
};

export default CourseChapters;
