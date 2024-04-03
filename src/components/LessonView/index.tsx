import { Stack, Paper, Typography } from "@mui/material";
import { Lesson } from "../../types";
import Markdown from "react-markdown";
import Exercises from "./Exercises";

const LessonView = ({ lesson }: { lesson: Lesson }) => {
  return (
    <Stack sx={{ p: 0, width: "100%", gap: 2 }}>
      <Paper sx={{ p: 1 }}>
        <Typography variant="h5">{lesson.title}</Typography>
        <Typography>{lesson.description}</Typography>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Markdown>{lesson.content}</Markdown>
      </Paper>

      <Exercises lesson={lesson} />
    </Stack>
  );
};

export default LessonView;
