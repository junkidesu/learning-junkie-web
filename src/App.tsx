import CourseCard from "./components/CourseCard";
import { Course } from "./types";
import {
  Container,
  CssBaseline,
  Grid,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import CustomAppBar from "./components/CustomAppBar";
import { useEffect, useState } from "react";
import axios from "axios";

const darkTheme = createTheme({ palette: { mode: "dark" } });

const App = () => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    axios
      .get<Course[]>("http://localhost:3001/courses")
      .then((response) => response.data)
      .then((courses) => setCourses(courses));
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container>
        <CustomAppBar />

        <Grid container spacing={4}>
          {courses.map((course) => (
            <Grid
              item
              key={course.id}
            >
              <CourseCard course={course} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default App;
