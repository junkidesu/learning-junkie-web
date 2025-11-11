import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Lesson } from "../../../types";
import { useNavigate } from "react-router-dom";
import { CheckCircleOutline, RadioButtonUnchecked } from "@mui/icons-material";
import useAuthUser from "../../../hooks/useAuthUser";

const LessonItem = ({ lesson }: { lesson: Lesson }) => {
  const navigate = useNavigate();

  const { lessonCompletions } = useAuthUser();

  const isLessonCompleted = lessonCompletions
    ?.map((lessonCompletion) => lessonCompletion.lesson.id)
    ?.some((id) => id === lesson.id);

  return (
    <ListItemButton
      key={lesson.id}
      onClick={() => navigate(`/lessons/${lesson.id}`)}
    >
      <ListItemIcon>
        {isLessonCompleted ? <CheckCircleOutline /> : <RadioButtonUnchecked />}
      </ListItemIcon>
      <ListItemText>
        <Typography variant="h6">
          Lesson {lesson.number} {lesson.title}
        </Typography>
      </ListItemText>
    </ListItemButton>
  );
};

export default LessonItem;
