import {
  Box,
  Button,
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

import EditCourseLessonList from "./EditCourseLessonList";
import { Add, Delete } from "@mui/icons-material";
import NewChapterForm from "./NewChapterForm";
import { useNavigate } from "react-router-dom";
import {
  useGetChaptersByCourseIdQuery,
  useDeleteChapterMutation,
} from "../../../services/chapter.service";
import { Course } from "../../../types";
import useAlert from "../../../hooks/useAlert";

const EditCourseChapters = ({ course }: { course: Course }) => {
  const { showAlert } = useAlert();

  const {
    data: chapters,
    isLoading,
    isError,
  } = useGetChaptersByCourseIdQuery(course.id);

  const navigate = useNavigate();

  const [newChapterForm, setNewChapterForm] = useState<boolean>(false);

  const [open, setOpen] = useState<string | boolean>(false);

  const [deleteChapter] = useDeleteChapterMutation();

  const handleChange = (panel: string) => () => {
    setOpen(panel === open ? false : panel);
  };

  const handleDeleteChapter = (chapterNumber: number) => async () => {
    try {
      await deleteChapter({ id: course.id, chapterNumber }).unwrap();
      console.log("success!");
      showAlert({
        severity: "success",
        message: "Deleted chapter successfully!",
      });
    } catch (error) {
      console.error(error);
      showAlert({ severity: "error", message: "Something went wrong :(" });
    }
  };

  if (isLoading) return <Typography>Loading chapters...</Typography>;

  if (isError || !chapters)
    return <Typography>Some error has occurred!</Typography>;

  const lastChapterNumber = Math.max(
    ...chapters.map((chapter) => chapter.number)
  );

  return (
    <Stack alignItems="stretch" gap={2}>
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => setNewChapterForm(!newChapterForm)}
      >
        Add chapter
      </Button>

      <Collapse sx={{ width: "100%" }} in={newChapterForm}>
        <NewChapterForm course={course} lastChapterNumber={lastChapterNumber} />
      </Collapse>

      <List component="nav" id="chapters-and-lessons" sx={{ width: "100%" }}>
        {chapters.length === 0 ? (
          <Typography>No chapters added yet</Typography>
        ) : (
          chapters.map((chapter) => (
            <div key={chapter.course.id.toString() + chapter.number.toString()}>
              <ListItem
                secondaryAction={
                  <Stack direction="row">
                    <IconButton
                      onClick={() =>
                        navigate(
                          `/courses/${course.id}/chapters/${chapter.number}/new-lesson`
                        )
                      }
                    >
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
                    <Typography
                      component="div"
                      sx={{ color: "text.secondary" }}
                    >
                      {chapter.description}
                    </Typography>
                  </ListItemText>
                </ListItemButton>
              </ListItem>

              <Box sx={{ p: 2 }}>
                <Collapse in={chapter.title === open} sx={{ p: 0 }}>
                  <EditCourseLessonList chapter={chapter} />
                </Collapse>
              </Box>
            </div>
          ))
        )}
      </List>
    </Stack>
  );
};

export default EditCourseChapters;
