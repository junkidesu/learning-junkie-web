import {
  Avatar,
  Button,
  Card,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { Course } from "../../types";
import { DeleteForeverOutlined } from "@mui/icons-material";
import universityLogo from "../../assets/university-logo.jpg";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useDeleteCourseMutation } from "../../services/courses.service";

const CourseItem = ({ course }: { course: Course }) => {
  const navigate = useNavigate();

  const [deleteCourse] = useDeleteCourseMutation();

  const handleDelete = async () => {
    await deleteCourse(course.id);
    console.log("Success!");
  };

  return (
    <Card square={false} elevation={5}>
      <Stack>
        <Stack direction="row" sx={{ p: 2 }}>
          <Avatar
            sx={{ height: 80, width: 80 }}
            src={course.university.logo || universityLogo}
          />

          <Container>
            <Typography
              sx={{ textDecoration: "none" }}
              variant="h5"
              color="inherit"
            >
              {course.title}
            </Typography>

            <Typography
              component={RouterLink}
              to={`/universities/${course.university.id}`}
              color="inherit"
            >
              {course.university.name}
            </Typography>

            <Typography>{course.enrollmentsCount} people enrolled</Typography>
          </Container>
        </Stack>

        <Divider />

        <Container sx={{ p: 1 }}>
          <Button onClick={() => navigate(`/courses/${course.id}`)}>
            Visit
          </Button>

          <Button onClick={() => navigate(`/courses/${course.id}`)}>
            Upload Banner
          </Button>

          <Button
            onClick={() => navigate(`/courses/${course.id}`)}
            color="error"
          >
            Remove Banner
          </Button>

          <Button
            color="error"
            sx={{ float: "right" }}
            onClick={handleDelete}
            startIcon={<DeleteForeverOutlined />}
          >
            Delete
          </Button>
        </Container>
      </Stack>
    </Card>
  );
};

export default CourseItem;
