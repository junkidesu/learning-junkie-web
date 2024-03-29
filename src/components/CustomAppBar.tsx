import { TipsAndUpdates, PlayLesson, School } from "@mui/icons-material";
import {
  AppBar,
  Container,
  Toolbar,
  Button,
  Typography,
  Stack,
} from "@mui/material";

const CustomAppBar = () => {
  return (
    <AppBar position="sticky" sx={{ mb: "20px" }}>
      <Container>
        <Toolbar disableGutters>
          <Button sx={{ mr: 2 }} startIcon={<TipsAndUpdates />} color="inherit">
            <Typography variant="h5">Learning Junkie</Typography>
          </Button>

          <Stack direction="row" sx={{ flexGrow: 1 }}>
            <Button color="inherit" startIcon={<PlayLesson />}>
              Courses
            </Button>

            <Button color="inherit" startIcon={<School />}>
              Universities
            </Button>
          </Stack>

          <Button color="inherit" sx={{ justifyContent: "right" }}>
            Login
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default CustomAppBar;
