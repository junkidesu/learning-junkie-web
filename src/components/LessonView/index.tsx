import { Stack, Paper, Typography, Divider } from "@mui/material";
import { Lesson } from "../../types";
import Markdown from "react-markdown";
import Exercises from "./Exercises";

const LessonView = ({ lesson }: { lesson: Lesson }) => {
  return (
    <Stack gap={1} sx={{ p: 0, width: "100%" }}>
      <Paper sx={{ p: 2 }}>
        <Stack gap={2}>
          <Typography variant="h5">{lesson.title}</Typography>
          <Typography>{lesson.description}</Typography>
          <Divider />
        </Stack>

        <Markdown>{lesson.content}</Markdown>
      </Paper>

      <Exercises lesson={lesson} />
    </Stack>
  );
};

export default LessonView;
