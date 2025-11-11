import {
  Box,
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import {
  useDeleteChapterMutation,
  useGetChaptersByCourseIdQuery,
} from "../../../../services/chapter.service";
import { Course } from "../../../../types";
import EditCourseLessonList from "./EditCourseLessonList";
import { Add, Delete } from "@mui/icons-material";

const EditCourseChapters = ({ course }: { course: Course }) => {
  const {
    data: chapters,
    isLoading,
    isError,
  } = useGetChaptersByCourseIdQuery(course.id);
  const [open, setOpen] = useState<string | boolean>(false);

  const [deleteChapter] = useDeleteChapterMutation();

  const handleChange = (panel: string) => () => {
    setOpen(panel === open ? false : panel);
  };

  const handleDeleteChapter = (chapterNumber: number) => async () => {
    try {
      await deleteChapter({ id: course.id, chapterNumber });
      console.log("success!");
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <Typography>Loading chapters...</Typography>;

  if (isError || !chapters)
    return <Typography>Some error has occurred!</Typography>;

  return (
    <Box sx={{ p: 0, display: "flex", alignItems: "start" }}>
      <List component="nav" id="chapters-and-lessons" sx={{ width: "100%" }}>
        {chapters.map((chapter) => (
          <>
            <ListItem
              secondaryAction={
                <Stack direction="row">
                  <IconButton>
                    <Add />
                  </IconButton>
                  <IconButton onClick={handleDeleteChapter(chapter.number)}>
                    <Delete />
                  </IconButton>
                </Stack>
              }
            >
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
            </ListItem>

            <Collapse in={chapter.title === open} sx={{ p: 0 }}>
              <EditCourseLessonList chapter={chapter} />
            </Collapse>
          </>
        ))}
      </List>
    </Box>
  );
};

export default EditCourseChapters;
