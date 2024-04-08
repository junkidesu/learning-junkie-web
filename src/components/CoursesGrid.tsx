import { Grid } from "@mui/material";
import { Course } from "../types";
import CourseCard from "./CourseCard";

const CoursesGrid = ({ courses }: { courses: Course[] }) => {
  return (
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
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CourseCard course={course} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CoursesGrid;
