import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Delete } from "@mui/icons-material";
import { useDeleteLessonMutation } from "../../../services/lessons.service";
import { Lesson } from "../../../types";
import useAlert from "../../../hooks/useAlert";

const EditCourseLessonItem = ({ lesson }: { lesson: Lesson }) => {
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const [deleteLesson] = useDeleteLessonMutation();

  const handleDelete = async () => {
    try {
      await deleteLesson(lesson.id).unwrap();
      console.log("success");
      showAlert({
        severity: "success",
        message: "Deleted lesson successfully!",
      });
    } catch (error) {
      console.error(error);
      showAlert({ severity: "error", message: "Could not delete the lesson" });
    }
  };

  return (
    <ListItem
      secondaryAction={
        <IconButton onClick={handleDelete}>
          <Delete />
        </IconButton>
      }
    >
      <ListItemButton
        key={lesson.id}
        onClick={() => navigate(`/lessons/${lesson.id}/edit`)}
      >
        <ListItemText>
          <Typography>
            Lesson {lesson.number} {lesson.title}
          </Typography>

          <Typography sx={{ color: "text.secondary" }}>
            {lesson.description}
          </Typography>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
};

export default EditCourseLessonItem;
