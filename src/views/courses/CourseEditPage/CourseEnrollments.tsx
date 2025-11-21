import { Stack, Typography } from "@mui/material";
import { useGetEnrolledUsersQuery } from "../../../services/courses.service";
import { Course } from "../../../types";
import EnrollmentItem from "../../../components/users/EnrollmentItem";

const CourseEnrollments = ({ course }: { course: Course }) => {
  const {
    data: enrollments,
    isLoading,
    isError,
  } = useGetEnrolledUsersQuery(course.id);

  if (isLoading) return <Typography>Loading enrollments...</Typography>;

  if (isError || !enrollments)
    return <Typography>Some error has occurred!</Typography>;

  return (
    <Stack gap={2}>
      {enrollments.map((e) => (
        <EnrollmentItem enrollment={e} />
      ))}
    </Stack>
  );
};

export default CourseEnrollments;
