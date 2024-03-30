import { Container } from "@mui/material";
import CustomAppBar from "./components/CustomAppBar";
import AllCourses from "./views/AllCourses";
import { Route, Routes } from "react-router-dom";
import CoursePage from "./views/CoursePage";
import LoginPage from "./views/LoginPage";

const App = () => {
  return (
    <Container>
      <CustomAppBar />

      <Routes>
        <Route path="/" element={<AllCourses />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="courses" element={<AllCourses />} />
        <Route path="courses/:id" element={<CoursePage />} />
        <Route path="universities" element={<div>all universities</div>} />
      </Routes>
    </Container>
  );
};

export default App;
