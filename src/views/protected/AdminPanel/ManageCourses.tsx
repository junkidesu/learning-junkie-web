import { Stack, Typography } from "@mui/material";
import { useGetCoursesQuery } from "../../../services/courses.service";
import CourseItem from "../../../components/courses/CourseItem";

const ManageCourses = () => {
  const { data: courses, isLoading, isError } = useGetCoursesQuery();

  if (isLoading) return <Typography>Loading ...</Typography>;

  if (isError || !courses)
    return <Typography>Some error has occurred!</Typography>;

  return (
    <Stack gap={2}>
      {courses.map((c) => (
        <CourseItem key={c.id} course={c} />
      ))}
    </Stack>
  );
};

export default ManageCourses;
