import {
  Paper,
  Stack,
  AvatarGroup,
  Typography,
  Button,
} from "@mui/material";
import UserAvatar from "../../../components/users/UserAvatar";
import { Course } from "../../../types";
import {
  useEnrollMutation,
  useGetEnrolledUsersQuery,
} from "../../../services/courses.service";
import useAuthUser from "../../../hooks/useAuthUser";
import { useNavigate } from "react-router-dom";
import SnackbarAlert from "../../../components/custom/SnackbarAlert";
import useAlert from "../../../hooks/useAlert";
import ProgressButton from "../../../components/custom/ProgressButton";
import LoadingEnrollments from "../../../components/loading/LoadingEnrollments";

const Enrollments = ({ course }: { course: Course }) => {
  const {
    data: enrolledUsers,
    isLoading,
    isError,
  } = useGetEnrolledUsersQuery(Number(course.id));

  const navigate = useNavigate();

  const { showAlert } = useAlert();

  const [enroll, { isLoading: enrolling }] = useEnrollMutation();

  const { existsId, authUser } = useAuthUser();

  if (isLoading) return <LoadingEnrollments />;

  if (isError || !enrolledUsers)
    return <Typography>Some error has occurred :(</Typography>;

  const isEnrolled = authUser
    ? enrolledUsers.map((u) => u.id).includes(authUser.id)
    : false;

  const handleEnroll = async () => {
    try {
      await enroll(course.id);
      showAlert({ severity: "success", message: "Successfully enrolled!" });
    } catch (error) {
      console.error(error);
      showAlert({ severity: "error" });
    }
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
          <ProgressButton
            isLoading={enrolling}
            onClick={handleEnroll}
            disabled={!existsId}
          >
            Enroll
          </ProgressButton>
        )}
      </Stack>

      <SnackbarAlert />
    </Paper>
  );
};

export default Enrollments;
