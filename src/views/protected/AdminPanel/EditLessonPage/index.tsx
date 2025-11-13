import { useParams } from "react-router-dom";
import { useGetLessonByIdQuery } from "../../../../services/lessons.service";
import {
  Box,
  Container,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import EditLessonForm from "./EditLessonForm";
import EditExercisesList from "./EditExercisesList";

const EditLessonPage = () => {
  const lessonId = useParams().id;

  const {
    data: lesson,
    isLoading,
    isError,
  } = useGetLessonByIdQuery(Number(lessonId), {
    skip: !lessonId,
  });

  if (!lessonId) return null;

  if (isLoading) return <Typography>Loading lesson...</Typography>;

  if (isError || !lesson)
    return <Typography>Some error has occurred!</Typography>;

  return (
    <Container>
      <Box>
        <Paper square={false} sx={{ p: 2, mb: 2 }}>
          <Stack gap={2}>
            <Typography>Edit Lesson</Typography>

            <Divider />

            <EditLessonForm lesson={lesson} />
          </Stack>
        </Paper>

        <Paper square={false} sx={{ p: 2, mb: 2 }}>
          <Stack gap={2}>
            <Typography>Exercises</Typography>

            <Divider />

            <EditExercisesList lesson={lesson} />
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
};

export default EditLessonPage;
