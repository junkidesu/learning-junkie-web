import { Container, Grid } from "@mui/material";
import CourseCard from "../components/CourseCard";
import { useGetCoursesQuery } from "../services/courses.service";
import LoadingCourseCard from "../components/LoadingCourseCard";

const AllCoursesPage = () => {
  const { data: courses, isLoading } = useGetCoursesQuery();

  return (
    <Container>
      {isLoading && (
        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <Grid item key={n} xs={4}>
              <LoadingCourseCard />
            </Grid>
          ))}
        </Grid>
      )}

      {courses && (
        <Grid container spacing={3}>
          {courses.map((course) => (
            <Grid item key={course.id} xs={4}>
              <CourseCard course={course} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default AllCoursesPage;
