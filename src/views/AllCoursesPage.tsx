import { Container, Grid } from "@mui/material";
import { useGetCoursesQuery } from "../services/courses.service";
import LoadingCourseCard from "../components/LoadingCourseCard";
import CoursesGrid from "../components/CoursesGrid";

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

      {courses && <CoursesGrid courses={courses} />}
    </Container>
  );
};

export default AllCoursesPage;
