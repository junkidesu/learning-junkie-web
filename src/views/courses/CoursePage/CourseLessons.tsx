import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Paper,
  Typography,
} from "@mui/material";
import { Course } from "../../../types";
import { useGetChaptersByCourseIdQuery } from "../../../services/chapter.service";
import ChapterLessons from "../../../components/courses/CourseNavigation/ChapterLessons";
import { useState } from "react";

const CourseLessons = ({ course }: { course: Course }) => {
  const {
    data: chapters,
    isLoading,
    isError,
  } = useGetChaptersByCourseIdQuery(course.id);
  const [expanded, setExpanded] = useState<string | boolean>(false);

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  if (isLoading) return <Typography>Loading chapters...</Typography>;

  if (isError || !chapters)
    return <Typography>Some error has occurred!</Typography>;

  return (
    <Paper id="chapters-and-lessons" square={false} sx={{ p: 2 }}>
      <Typography variant="h5">Chapters and Lessons</Typography>

      {chapters.map((chapter) => (
        <Accordion
          key={chapter.number}
          elevation={4}
          expanded={chapter.title === expanded}
          onChange={handleChange(chapter.title)}
        >
          <AccordionSummary>
            <Typography component="span" sx={{ width: "33%", flexShrink: 0 }}>
              {chapter.number}. {chapter.title}
            </Typography>
            <Typography component="span" sx={{ color: "text.secondary" }}>
              {chapter.description}
            </Typography>
          </AccordionSummary>

          <AccordionDetails sx={{ p: 0 }}>
            <ChapterLessons chapter={chapter} />
          </AccordionDetails>
        </Accordion>
      ))}
    </Paper>
  );
};

export default CourseLessons;
