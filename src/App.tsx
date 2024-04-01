import { Container } from "@mui/material";
import CustomAppBar from "./components/CustomAppBar";
import AllCoursesPage from "./views/AllCoursesPage";
import { Route, Routes } from "react-router-dom";
import CoursePage from "./views/CoursePage";
import LoginPage from "./views/LoginPage";
import AllUniversitiesPage from "./views/AllUniversitiesPage";
import UniversityPage from "./views/UniversityPage";
import UserPage from "./views/UserPage";

const App = () => {
  return (
    <Container>
      <CustomAppBar />

      <Routes>
        <Route path="/" element={<AllCoursesPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="courses" element={<AllCoursesPage />} />
        <Route path="courses/:id" element={<CoursePage />} />
        <Route path="universities" element={<AllUniversitiesPage />} />
        <Route path="universities/:id" element={<UniversityPage />} />
        <Route path="users/:id" element={<UserPage />} />
      </Routes>
    </Container>
  );
};

export default App;
