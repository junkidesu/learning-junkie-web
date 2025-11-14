import { Button, Container, Stack, Typography } from "@mui/material";
import { useGetCoursesQuery } from "../../../services/courses.service";
import { PlayLesson } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CourseItem from "../../../components/courses/CourseItem";

const ManageCourses = () => {
  const { data: courses, isLoading, isError } = useGetCoursesQuery();

  const navigate = useNavigate();

  if (isLoading) return <Typography>Loading ...</Typography>;

  if (isError || !courses)
    return <Typography>Some error has occurred!</Typography>;

  return (
    <Stack gap={2}>
      {courses.map((c) => (
        <CourseItem key={c.id} course={c} />
      ))}

      <Container>
        <Button
          sx={{ float: "right" }}
          variant="contained"
          startIcon={<PlayLesson />}
          onClick={() => navigate(`/courses/new`)}
        >
          Add course
        </Button>
      </Container>
    </Stack>
  );
};

export default ManageCourses;
