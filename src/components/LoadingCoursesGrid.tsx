import { Grid } from "@mui/material";
import LoadingCourseCard from "./LoadingCourseCard";

const LoadingCoursesGrid = () => {
  return (
    <Grid container spacing={3} columns={{ xs: 12, sm: 8, md: 12 }}>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <Grid
          item
          key={i}
          xs={12}
          sm={4}
          md={4}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LoadingCourseCard />
        </Grid>
      ))}
    </Grid>
  );
};

export default LoadingCoursesGrid;
