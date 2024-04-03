import {
  Paper,
  Stack,
  AvatarGroup,
  Typography,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import UserAvatar from "../../components/UserAvatar";
import { Course } from "../../types";
import {
  useEnrollMutation,
  useGetEnrolledUsersQuery,
} from "../../services/courses.service";
import useAuthUser from "../../hooks/useAuthUser";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Enrollments = ({ course }: { course: Course }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const { data: enrolledUsers, isLoading } = useGetEnrolledUsersQuery(
    Number(course.id)
  );

  const navigate = useNavigate();

  const [enroll] = useEnrollMutation();

  const { existsId, authUser } = useAuthUser();

  if (isLoading || !enrolledUsers) return <Typography>Loading...</Typography>;

  const isEnrolled = authUser
    ? enrolledUsers.map((u) => u.id).includes(authUser.id)
    : false;

  const handleEnroll = async () => {
    try {
      await enroll(course.id);
      setSuccess(true);
      setSnackbarOpen(true);
    } catch (error) {
      setSuccess(false);
      setSnackbarOpen(true);
      console.error(error);
    }
  };

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;

    setSnackbarOpen(false);
  };

  return (
    <Paper square={false} sx={{ p: 2 }}>
      <Stack direction="row" sx={{ alignItems: "center" }}>
        <AvatarGroup max={3} sx={{ mr: 1 }}>
          {enrolledUsers.map((user) => (
            <UserAvatar key={user.id} user={user} />
          ))}
        </AvatarGroup>

        <Typography sx={{ flexGrow: 1 }}>
          {course.enrollmentsCount} users are already enrolled.
        </Typography>

        {isEnrolled ? (
          <Button
            variant="contained"
            onClick={() => navigate(`/courses/${course.id}/lessons`)}
          >
            Continue
          </Button>
        ) : (
          <Button
            variant="contained"
            disabled={!existsId}
            onClick={handleEnroll}
          >
            Enroll
          </Button>
        )}
      </Stack>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={success ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {success
            ? `Successfully enrolled in course "${course.title}"!`
            : "Some error has occurred :("}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default Enrollments;
