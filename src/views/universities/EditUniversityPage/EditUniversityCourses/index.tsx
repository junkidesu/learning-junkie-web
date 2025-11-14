import { Divider, Stack, Typography } from "@mui/material";
import { University } from "../../../../types";
import AddCourseForm from "./AddCourseForm";
import { useGetUniversityCoursesQuery } from "../../../../services/universities.service";
import CourseItem from "../../../../components/courses/CourseItem";

const EditUniversityCourses = ({ university }: { university: University }) => {
  const {
    data: courses,
    isLoading,
    isError,
  } = useGetUniversityCoursesQuery(university.id);

  if (isLoading) return <Typography>Loading courses...</Typography>;

  if (isError || !courses)
    return <Typography>Some error has occurred!</Typography>;

  return (
    <Stack gap={2}>
      <AddCourseForm university={university} />

      <Divider />

      <Typography variant="h6">Courses by {university.name}</Typography>

      {courses.map((course) => (
        <CourseItem key={course.id} course={course} />
      ))}
    </Stack>
  );
};

export default EditUniversityCourses;
