import { Paper, Stack, Typography, Avatar } from "@mui/material";
import { defaultUniversityLogo } from "../../assets";
import { Exercise } from "../../types";
import { Link as RouterLink } from "react-router-dom";

const SolutionItem = ({ exercise }: { exercise: Exercise }) => {
  return (
    <Paper sx={{ p: 3 }}>
      <Stack direction="row" sx={{ alignItems: "center" }}>
        <Stack flexGrow={1} gap={2}>
          <Typography
            variant="h5"
            color="inherit"
            component={RouterLink}
            to={`/courses/${exercise.course.id}/lessons/`}
            sx={{ textDecoration: "none" }}
          >
            {exercise.title || "Exercise"}
          </Typography>

          <Stack
            direction="row"
            gap={1}
            component={RouterLink}
            to={`/courses/${exercise.course.id}`}
            color="inherit"
            sx={{ textDecoration: "none" }}
          >
            <Avatar
              src={exercise.course.university.logo || defaultUniversityLogo}
              sx={{ height: 25, width: 25 }}
            />
            <Typography color="inherit">{exercise.course.title}</Typography>
          </Stack>
        </Stack>

        <Typography variant="h6">
          Grade: {exercise.grade} / {exercise.grade}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default SolutionItem;
