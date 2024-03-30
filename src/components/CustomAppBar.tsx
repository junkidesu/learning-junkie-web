import { TipsAndUpdates, PlayLesson, School, Login } from "@mui/icons-material";
import {
  AppBar,
  Container,
  Toolbar,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const CustomAppBar = () => {
  return (
    <AppBar position="sticky" sx={{ mb: "20px" }}>
      <Container>
        <Toolbar disableGutters>
          <RouterLink to="/">
            <Button sx={{ mr: 2 }} startIcon={<TipsAndUpdates />}>
              <Typography variant="h5">Learning Junkie</Typography>
            </Button>
          </RouterLink>

          <Stack direction="row" sx={{ flexGrow: 1 }}>
            <RouterLink to="/courses">
              <Button startIcon={<PlayLesson />}>Courses</Button>
            </RouterLink>

            <RouterLink to="/universities">
              <Button startIcon={<School />}>Universities</Button>
            </RouterLink>
          </Stack>

          <RouterLink to="/login">
            <Button sx={{ justifyContent: "right" }} startIcon={<Login />}>
              Login
            </Button>
          </RouterLink>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default CustomAppBar;
