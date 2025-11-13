import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDeleteLessonMutation } from "../../../../services/lessons.service";
import { Lesson } from "../../../../types";
import { Delete } from "@mui/icons-material";

const EditCourseLessonItem = ({ lesson }: { lesson: Lesson }) => {
  const navigate = useNavigate();

  const [deleteLesson] = useDeleteLessonMutation();

  const handleDelete = async () => {
    await deleteLesson(lesson.id);
    console.log("success");
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
          <Typography variant="h6">
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
