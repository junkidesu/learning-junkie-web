import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import CustomAppBar from "./components/custom/CustomAppBar";
import AllCoursesPage from "./views/courses/AllCoursesPage";
import { Route, Routes } from "react-router-dom";
import CoursePage from "./views/courses/CoursePage";
import LoginPage from "./views/auth/LoginPage";
import AllUniversitiesPage from "./views/universities/AllUniversitiesPage";
import UniversityPage from "./views/universities/UniversityPage";
import UserPage from "./views/users/UserPage";
import SignUpPage from "./views/auth/SignUpPage";
import AdminPanel from "./views/protected/AdminPanel";
import NewUniversityPage from "./views/protected/AdminPanel/NewUniversityPage";
import NewCoursePage from "./views/protected/AdminPanel/NewCoursePage";
import { useEffect, useState } from "react";
import useInitialization from "./hooks/useInitialization";
import NewInstructorPage from "./views/protected/AdminPanel/NewInstructorPage";
import Protected from "./components/custom/Protected";
import InstructorPanel from "./views/protected/InstructorPanel";
import LessonPage from "./views/lessons/LessonPage";
import CourseEditPage from "./views/protected/AdminPanel/CourseEditPage";
import NewLessonPage from "./views/protected/AdminPanel/NewLessonPage";
import EditLessonPage from "./views/protected/AdminPanel/EditLessonPage";

const darkTheme = createTheme({ palette: { mode: "dark" } });
const lightTheme = createTheme({ palette: { mode: "light" } });

const App = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const { restoreUser } = useInitialization();

  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", "dark");
  }, []);

  useEffect(() => {
    restoreUser();
  }, [restoreUser]);

  const toggleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      document.documentElement.setAttribute("data-color-mode", "light");
    } else {
      setTheme("dark");
      document.documentElement.setAttribute("data-color-mode", "dark");
    }
  };

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <CssBaseline />
      <Container sx={{ p: 0 }}>
        <CustomAppBar theme={theme} toggleTheme={toggleTheme} />

        <Routes>
          <Route path="/" element={<AllCoursesPage />} />
          <Route
            path="admin"
            element={
              <Protected>
                <AdminPanel />
              </Protected>
            }
          />
          <Route
            path="instructor"
            element={
              <Protected instructor>
                <InstructorPanel />
              </Protected>
            }
          />
          <Route
            path="courses/:id/edit"
            element={
              <Protected instructor>
                <CourseEditPage />
              </Protected>
            }
          />

          <Route
            path="courses/:id/chapters/:chapterNumber/new-lesson"
            element={
              <Protected instructor>
                <NewLessonPage />
              </Protected>
            }
          />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignUpPage />} />
          <Route path="courses" element={<AllCoursesPage />} />
          <Route
            path="courses/new"
            element={
              <Protected>
                <NewCoursePage />
              </Protected>
            }
          />
          <Route path="courses/:id" element={<CoursePage />} />

          <Route path="lessons/:id" element={<LessonPage />} />

          <Route
            path="lessons/:id/edit"
            element={
              <Protected instructor>
                <EditLessonPage />
              </Protected>
            }
          />
          <Route path="universities" element={<AllUniversitiesPage />} />
          <Route
            path="universities/new"
            element={
              <Protected>
                <NewUniversityPage />
              </Protected>
            }
          />
          <Route path="universities/:id" element={<UniversityPage />} />
          <Route
            path="universities/:id/instructors/new"
            element={
              <Protected>
                <NewInstructorPage />
              </Protected>
            }
          />
          <Route path="users/:id" element={<UserPage />} />
        </Routes>
      </Container>
    </ThemeProvider>
  );
};

export default App;
