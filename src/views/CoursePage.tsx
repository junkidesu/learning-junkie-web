import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Container,
  Divider,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Link as RouterLink, useParams } from "react-router-dom";
import {
  useGetCourseByIdQuery,
  useGetEnrolledUsersQuery,
} from "../services/courses.service";
import universityLogo from "../assets/university-logo.jpg";
import courseBanner from "../assets/python-banner.jpg";
import instructorAvatar from "../assets/instructor.jpg";
import { educationToString } from "../types";

const CoursePage = () => {
  const courseId = useParams().id;

  const { data: course, isLoading } = useGetCourseByIdQuery(Number(courseId), {
    skip: !courseId,
  });

  const { data: enrolledUsers } = useGetEnrolledUsersQuery(Number(courseId), {
    skip: !courseId,
  });

  if (!courseId) return null;

  if (isLoading || !course || !enrolledUsers) return <div>Loading...</div>;

  return (
    <Container>
      <Paper square={false} sx={{ overflow: "hidden", mb: 2 }}>
        <img
          src={courseBanner}
          width="100%"
          height="250px"
          style={{ overflow: "hidden", objectFit: "cover" }}
        />

        <Stack direction="row" sx={{ alignItems: "center", p: 2 }}>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            {course.title}
          </Typography>

          <Link
            component={RouterLink}
            to={`/universities/${course.university.id}`}
          >
            <Stack direction="row" sx={{ alignItems: "center" }}>
              <Typography sx={{ mr: 1 }}>{course.university.name}</Typography>
              <Avatar src={universityLogo} />
            </Stack>
          </Link>
        </Stack>

        <Divider />

        <Box sx={{ p: 2 }}>
          <Typography variant="h5">Description</Typography>
          <Typography>{course.description}</Typography>
        </Box>

        <Box sx={{ p: 2, float: "right" }}>
          <Paper
            sx={{ p: 1, width: "fit-content" }}
            elevation={5}
            square={false}
          >
            <Stack direction="row" sx={{ alignItems: "center" }}>
              <Avatar src={instructorAvatar} sx={{ mr: 1 }} />

              <Box>
                <Typography>
                  {course.instructor.name},{" "}
                  {educationToString(course.instructor.education!)}
                </Typography>
                <Typography fontSize={13}>{course.university.name}</Typography>
              </Box>
            </Stack>
          </Paper>
        </Box>
      </Paper>

      <Paper square={false} sx={{ p: 2 }}>
        <Stack direction="row" sx={{ alignItems: "center" }}>
          <AvatarGroup max={2} sx={{ mr: 1 }}>
            {enrolledUsers.map((user) => (
              <Avatar key={user.id}>{user.name.substring(0, 1)}</Avatar>
            ))}
          </AvatarGroup>

          <Typography sx={{ flexGrow: 1 }}>
            {course.enrollmentsCount} users are already enrolled.
          </Typography>

          <Button variant="contained">Enroll</Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default CoursePage;
