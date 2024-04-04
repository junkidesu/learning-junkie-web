import {
  Button,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Lesson } from "../../types";
import { useNavigate } from "react-router-dom";

const LessonItem = ({ lesson }: { lesson: Lesson }) => {
  const navigate = useNavigate();

  return (
    <Paper elevation={5} sx={{ p: 2 }}>
      <Stack gap={2}>
        <Typography variant="h5">
          Lesson {lesson.number}. {lesson.title}
        </Typography>
        <Typography>{lesson.description}</Typography>

        <Divider />

        <Container>
          <Button
            onClick={() => navigate(`/courses/${lesson.course.id}/lessons/`)}
          >
            Visit
          </Button>

          <Button
            sx={{ float: "right" }}
            color="error"
            onClick={() =>
              navigate(
                `/courses/${lesson.course.id}/lessons/${lesson.number}/edit`
              )
            }
          >
            Delete
          </Button>

          <Button
            sx={{ float: "right" }}
            onClick={() =>
              navigate(
                `/courses/${lesson.course.id}/lessons/${lesson.number}/edit`
              )
            }
          >
            Edit
          </Button>
        </Container>
      </Stack>
    </Paper>
  );
};

export default LessonItem;
