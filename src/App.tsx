import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import CustomAppBar from "./components/CustomAppBar";
import AllCoursesPage from "./views/courses/AllCoursesPage";
import { Route, Routes } from "react-router-dom";
import CoursePage from "./views/courses/CoursePage";
import LoginPage from "./views/auth/LoginPage";
import AllUniversitiesPage from "./views/universities/AllUniversitiesPage";
import UniversityPage from "./views/universities/UniversityPage";
import UserPage from "./views/users/UserPage";
import SignUpPage from "./views/auth/SignUpPage";
import LessonsPage from "./views/courses/LessonsPage";
import AdminPanel from "./views/protected/AdminPanel";
import NewUniversityPage from "./views/protected/AdminPanel/NewUniversityPage";
import NewCoursePage from "./views/protected/AdminPanel/NewCoursePage";
import ManageLessonsPage from "./views/protected/AdminPanel/ManageLessonsPage";
import NewLessonPage from "./views/protected/NewLessonPage";
import { useEffect, useState } from "react";
import useInitialization from "./hooks/useInitialization";
import NewInstructorPage from "./views/protected/AdminPanel/NewInstructorPage";
import EditLessonPage from "./views/protected/EditLessonPage";
import Protected from "./components/custom/Protected";
import InstructorPanel from "./views/protected/InstructorPanel";

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
          <Route path="courses/:id/lessons" element={<LessonsPage />} />
          <Route
            path="courses/:id/lessons/new"
            element={
              <Protected instructor>
                <NewLessonPage />
              </Protected>
            }
          />
          <Route
            path="courses/:id/lessons/edit"
            element={
              <Protected instructor>
                <ManageLessonsPage />
              </Protected>
            }
          />
          <Route
            path="courses/:id/lessons/:number/edit"
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
