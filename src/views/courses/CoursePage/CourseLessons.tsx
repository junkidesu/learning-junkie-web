import {
  Collapse,
  Container,
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

const CourseLessons = ({ course }: { course: Course }) => {
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
    <Paper sx={{ p: 2 }}>
      <Typography variant="h5">Course Syllabus</Typography>
      <List component="nav" id="chapters-and-lessons">
        {chapters.map((chapter) => (
          <Container>
            <ListItemButton
              key={chapter.number}
              onClick={handleChange(chapter.title)}
            >
              <ListItemText>
                <Typography
                  component="span"
                  fontSize={20}
                  variant="h6"
                  // sx={{ mb: 1, fontWeight: "bold" }}
                >
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
          </Container>
        ))}
      </List>
    </Paper>
  );
};

export default CourseLessons;
