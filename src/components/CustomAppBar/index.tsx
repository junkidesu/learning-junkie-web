import {
  TipsAndUpdates,
  PlayLesson,
  School,
  AdminPanelSettings,
} from "@mui/icons-material";
import {
  AppBar,
  Container,
  Toolbar,
  Button,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuthUser from "../../hooks/useAuthUser";
import ProfileMenu from "./ProfileMenu";
import NavMenu from "./NavMenu";

const CustomAppBar = () => {
  const { authUser } = useAuthUser();

  const navigate = useNavigate();

  return (
    <AppBar position="sticky" sx={{ mb: "20px" }}>
      <Container>
        <Toolbar disableGutters>
          <Stack
            direction="row"
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
          >
            <Button
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
              startIcon={<TipsAndUpdates />}
              color="inherit"
              onClick={() => navigate(`/`)}
            >
              <Typography variant="h5">Learning Junkie</Typography>
            </Button>

            <Button
              startIcon={<PlayLesson />}
              color="inherit"
              onClick={() => navigate(`/courses`)}
            >
              Courses
            </Button>

            <Button
              startIcon={<School />}
              color="inherit"
              onClick={() => navigate(`/universities`)}
            >
              Universities
            </Button>

            {authUser?.role === "Admin" && (
              <Button
                startIcon={<AdminPanelSettings />}
                color="inherit"
                onClick={() => navigate(`/admin`)}
              >
                Admin
              </Button>
            )}

            {authUser?.role === "Instructor" && (
              <Button
                startIcon={<AdminPanelSettings />}
                color="inherit"
                onClick={() => navigate(`/instructor`)}
              >
                Instructor
              </Button>
            )}

            <Box sx={{ flexGrow: 1 }}>
              <ProfileMenu />
            </Box>
          </Stack>

          <Stack
            direction="row"
            sx={{
              display: { xs: "flex", md: "none" },
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <NavMenu />

            <Button
              startIcon={<TipsAndUpdates />}
              color="inherit"
              sx={{ display: { xs: "flex", md: "none" } }}
              onClick={() => navigate("/")}
            >
              Learning Junkie
            </Button>

            <ProfileMenu />
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default CustomAppBar;
