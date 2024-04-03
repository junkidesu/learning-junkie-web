import {
  Paper,
  Stack,
  Avatar,
  Typography,
  Box,
  CircularProgress,
  Button,
} from "@mui/material";
import { Progress, User } from "../types";
import { useNavigate } from "react-router-dom";

const ProgressItem = ({
  progress,
  user,
}: {
  progress: Progress;
  user: User;
}) => {
  const navigate = useNavigate();

  const isCompleted =
    progress.course.totalPoints &&
    progress.obtainedPoints === progress.course.totalPoints;

  const certificateLink = `${import.meta.env.VITE_BACKEND_URL}/users/${
    user.id
  }/courses/${progress.course.id}/certificate`;

  return (
    <Paper>
      <Stack direction="row" sx={{ p: 2, alignItems: "center" }}>
        <Avatar
          src={progress.course.university.logo}
          sx={{ width: 80, height: 80, mr: 2 }}
        />

        <Stack sx={{ flexGrow: 1 }}>
          <Typography variant="h6">{progress.course.title}</Typography>
          <Typography>{progress.course.difficulty}</Typography>
        </Stack>

        <Stack gap={3} sx={{ alignItems: "center" }}>
          <Box sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress
              variant="determinate"
              size={70}
              value={
                !progress.course.totalPoints
                  ? 0
                  : (100 * progress.obtainedPoints) /
                    progress.course.totalPoints
              }
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                component="div"
                color="text.secondary"
              >{`${Math.round(
                !progress.course.totalPoints
                  ? 0
                  : (100 * progress.obtainedPoints) /
                      progress.course.totalPoints
              )}%`}</Typography>
            </Box>
          </Box>

          {isCompleted ? (
            <Button
              variant="contained"
              color="success"
              onClick={() => window.open(certificateLink)}
            >
              Certificate
            </Button>
          ) : (
            <Button
              onClick={() => navigate(`/courses/${progress.course.id}/lessons`)}
            >
              Continue
            </Button>
          )}
        </Stack>
      </Stack>
    </Paper>
  );
};

export default ProgressItem;
