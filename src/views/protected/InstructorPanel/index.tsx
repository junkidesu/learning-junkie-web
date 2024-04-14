import { Container, Divider, Paper, Stack, Typography } from "@mui/material";
import useAuthUser from "../../../hooks/useAuthUser";
import { useGetTaughtCoursesQuery } from "../../../services/users.service";
import CourseItem from "../AdminPanel/CourseItem";

const InstructorPanel = () => {
  const { authUser, userLoading, userError } = useAuthUser();

  const {
    data: courses,
    isLoading,
    isError,
  } = useGetTaughtCoursesQuery(authUser!.id, {
    skip: !authUser,
  });

  if (userLoading || isLoading) return <Typography>Loading...</Typography>;

  if (userError || !authUser || isError || !courses)
    return <Typography>Some error has occurred!</Typography>;

  return (
    <Container>
      <Paper sx={{ p: 2 }}>
        <Stack gap={2}>
          <Typography variant="h5">Instructor panel</Typography>

          <Divider />

          {courses.map((c) => (
            <CourseItem key={c.id} course={c} />
          ))}
        </Stack>
      </Paper>
    </Container>
  );
};

export default InstructorPanel;
