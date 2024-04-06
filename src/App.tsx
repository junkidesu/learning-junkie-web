import { Container } from "@mui/material";
import CustomAppBar from "./components/CustomAppBar";
import AllCoursesPage from "./views/AllCoursesPage";
import { Route, Routes } from "react-router-dom";
import CoursePage from "./views/CoursePage";
import LoginPage from "./views/LoginPage";
import AllUniversitiesPage from "./views/AllUniversitiesPage";
import UniversityPage from "./views/UniversityPage";
import UserPage from "./views/UserPage";
import SignUpPage from "./views/SignUpPage";
import LessonsPage from "./views/LessonsPage";
import AdminPanel from "./views/AdminPanel";
import NewUniversityPage from "./views/AdminPanel/NewUniversityPage";
import NewCoursePage from "./views/AdminPanel/NewCoursePage";
import ManageLessonsPage from "./views/AdminPanel/ManageLessonsPage";
import NewLessonPage from "./views/AdminPanel/NewLessonPage";
import { useEffect } from "react";
import useInitialization from "./hooks/useInitialization";
import NewInstructorPage from "./views/AdminPanel/NewInstructorPage";
import EditLessonPage from "./views/AdminPanel/EditLessonPage";

const App = () => {
  const { restoreUser } = useInitialization();

  useEffect(() => {
    console.log("Restoring user");

    restoreUser();
  }, [restoreUser]);

  return (
    <Container>
      <CustomAppBar />

      <Routes>
        <Route path="/" element={<AllCoursesPage />} />
        <Route path="admin" element={<AdminPanel />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="courses" element={<AllCoursesPage />} />
        <Route path="courses/new" element={<NewCoursePage />} />
        <Route path="courses/:id" element={<CoursePage />} />
        <Route path="courses/:id/lessons" element={<LessonsPage />} />
        <Route path="courses/:id/lessons/new" element={<NewLessonPage />} />
        <Route
          path="courses/:id/lessons/edit"
          element={<ManageLessonsPage />}
        />
        <Route
          path="courses/:id/lessons/:number/edit"
          element={<EditLessonPage />}
        />
        <Route path="universities" element={<AllUniversitiesPage />} />
        <Route path="universities/new" element={<NewUniversityPage />} />
        <Route path="universities/:id" element={<UniversityPage />} />
        <Route
          path="universities/:id/instructors/new"
          element={<NewInstructorPage />}
        />
        <Route path="users/:id" element={<UserPage />} />
      </Routes>
    </Container>
  );
};

export default App;
