import {
  Paper,
  Stack,
  Avatar,
  Typography,
  Box,
  CircularProgress,
  Button,
  useTheme,
  useMediaQuery,
  LinearProgress,
  Divider,
} from "@mui/material";
import { Progress, User } from "../types";
import { useNavigate } from "react-router-dom";
import universityLogo from "../assets/university-logo.jpg";

const ProgressItem = ({
  progress,
  user,
}: {
  progress: Progress;
  user: User;
}) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();

  const isCompleted =
    progress.course.totalPoints &&
    progress.obtainedPoints === progress.course.totalPoints;

  const certificateLink = `${import.meta.env.VITE_BACKEND_URL}/users/${
    user.id
  }/enrollments/${progress.course.id}/certificate`;

  if (matches)
    return (
      <Paper>
        <Stack sx={{ p: 2 }} gap={3}>
          <Stack direction="row" gap={2} sx={{ alignItems: "center" }}>
            <Avatar
              src={progress.course.university.logo || universityLogo}
              sx={{ width: 80, height: 80 }}
            />

            <Stack sx={{ flexGrow: 1 }}>
              <Typography variant="h6">{progress.course.title}</Typography>
              <Typography>{progress.course.difficulty}</Typography>
            </Stack>
          </Stack>

          <Stack gap={1}>
            <LinearProgress
              variant="determinate"
              value={
                !progress.course.totalPoints
                  ? 0
                  : (100 * progress.obtainedPoints) /
                    progress.course.totalPoints
              }
            />

            <Box>
              <Typography
                variant="caption"
                component="div"
                color="text.secondary"
                sx={{ float: "right" }}
              >
                Progress:{" "}
                {`${Math.round(
                  !progress.course.totalPoints
                    ? 0
                    : (100 * progress.obtainedPoints) /
                        progress.course.totalPoints
                )}%`}
              </Typography>
            </Box>
          </Stack>

          <Divider />

          {isCompleted ? (
            <Button
              variant="contained"
              color="success"
              onClick={() => window.open(certificateLink)}
            >
              Certificate
            </Button>
          ) : (
            <Box>
              <Button
                sx={{ float: "right" }}
                onClick={() =>
                  navigate(`/courses/${progress.course.id}/lessons`)
                }
              >
                Continue
              </Button>
            </Box>
          )}
        </Stack>
      </Paper>
    );

  return (
    <Paper>
      <Stack direction="row" sx={{ p: 2, alignItems: "center" }}>
        <Avatar
          src={progress.course.university.logo || universityLogo}
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
