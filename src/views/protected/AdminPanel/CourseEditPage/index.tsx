import { useParams } from "react-router-dom";
import {
  useGetCourseByIdQuery,
} from "../../../../services/courses.service";
import {
  Container,
  Paper,

  Typography,
} from "@mui/material";
import { defaultCourseBanner2 } from "../../../../assets";
import EditCourseInformation from "./EditCourseInformation";

const CourseEditPage = () => {
  const courseId = useParams().id;

  const {
    data: course,
    isLoading,
    isError,
  } = useGetCourseByIdQuery(Number(courseId!), { skip: !courseId });

  if (!courseId) return null;

  if (isLoading) return <Typography>Loading...</Typography>;

  if (isError || !course)
    return <Typography>Some error has occurred!</Typography>;

  return (
    <Container sx={{ p: 0, mb: 2 }}>
      <Paper square={false} sx={{ overflow: "hidden" }}>
        <img
          src={course.banner || defaultCourseBanner2}
          width="100%"
          height="250px"
          style={{ overflow: "hidden", objectFit: "cover" }}
        />

        <EditCourseInformation course={course} />
      </Paper>
    </Container>
  );
};

export default CourseEditPage;
