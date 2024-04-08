import { Container, Grid } from "@mui/material";
import CourseCard from "../components/CourseCard";
import { useGetCoursesQuery } from "../services/courses.service";
import LoadingCourseCard from "../components/LoadingCourseCard";

const AllCoursesPage = () => {
  const { data: courses, isLoading } = useGetCoursesQuery();

  return (
    <Container sx={{ alignItems: "center" }}>
      {isLoading && (
        <Grid container spacing={3}>
          {Array(6).map((n) => (
            <Grid item key={n} xs={4}>
              <LoadingCourseCard />
            </Grid>
          ))}
        </Grid>
      )}

      {courses && (
        <Grid container spacing={3} columns={{ xs: 12, sm: 8, md: 12 }}>
          {courses.map((course) => (
            <Grid
              item
              key={course.id}
              xs={12}
              sm={4}
              md={4}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CourseCard course={course} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default AllCoursesPage;
