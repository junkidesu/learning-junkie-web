import { Container } from "@mui/material";
import { useGetCoursesQuery } from "../../services/courses.service";
import CoursesGrid from "../../components/courses/CoursesGrid";
import LoadingCoursesGrid from "../../components/loading/LoadingCoursesGrid";

const AllCoursesPage = () => {
  const { data: courses, isLoading } = useGetCoursesQuery();

  return (
    <Container sx={{ alignItems: "center" }}>
      {isLoading && <LoadingCoursesGrid />}

      {courses && <CoursesGrid courses={courses} />}
    </Container>
  );
};

export default AllCoursesPage;
