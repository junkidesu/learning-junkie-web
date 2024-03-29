import { TipsAndUpdates, PlayLesson, School } from "@mui/icons-material";
import {
  AppBar,
  Container,
  Toolbar,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";

const CustomAppBar = () => {
  return (
    <AppBar position="sticky" sx={{ mb: "20px" }}>
      <Container>
        <Toolbar disableGutters>
          <Link to="/">
            <Button sx={{ mr: 2 }} startIcon={<TipsAndUpdates />}>
              <Typography variant="h5">Learning Junkie</Typography>
            </Button>
          </Link>

          <Stack direction="row" sx={{ flexGrow: 1 }}>
            <Link to="/courses">
              <Button startIcon={<PlayLesson />}>Courses</Button>
            </Link>

            <Link to="/universities">
              <Button startIcon={<School />}>Universities</Button>
            </Link>
          </Stack>

          <Link to="/login">
            <Button sx={{ justifyContent: "right" }}>Login</Button>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default CustomAppBar;
