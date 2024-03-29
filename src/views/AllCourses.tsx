import { Backdrop, CircularProgress, Grid } from "@mui/material";
import CourseCard from "../components/CourseCard";
import { useState, useEffect } from "react";
import { useGetCoursesQuery } from "../services/courses.service";

const AllCourses = () => {
  const [open, setOpen] = useState<boolean>(true);

  const handleClose = () => {
    setOpen(false);
  };

  const { data: courses, isLoading } = useGetCoursesQuery();

  useEffect(() => {
    if (!isLoading) {
      handleClose();
    }
  }, [isLoading]);

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {courses && (
        <Grid container spacing={3}>
          {courses.map((course) => (
            <Grid item key={course.id}>
              <CourseCard course={course} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default AllCourses;
