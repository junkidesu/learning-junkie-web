import { TipsAndUpdates, PlayLesson, School, Login } from "@mui/icons-material";
import {
  AppBar,
  Container,
  Toolbar,
  Button,
  Typography,
  Stack,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useGetUserByIdQuery } from "../services/users.service";
import { useState } from "react";
import instructorAvatar from "../assets/instructor.jpg";
import { removeAuth } from "../reducers/auth.reducer";

const CustomAppBar = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined>();
  const open = Boolean(anchorEl);

  const dispatch = useAppDispatch();

  const id = useAppSelector(({ auth }) => auth.id);
  const { data: loggedInUser } = useGetUserByIdQuery(id!, {
    skip: !id,
  });

  const handleClose = () => {
    setAnchorEl(undefined);
  };

  const handleLogout = () => {
    handleClose();
    dispatch(removeAuth());
  };

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

          {id ? (
            <>
              <IconButton
                sx={{ p: 0 }}
                onClick={(e) => setAnchorEl(e.currentTarget)}
              >
                <Tooltip title={loggedInUser?.name}>
                  <Avatar src={instructorAvatar} alt={loggedInUser?.name} />
                </Tooltip>
              </IconButton>

              <Menu
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                sx={{
                  mt: "45px",
                }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Account</MenuItem>
                <MenuItem onClick={handleLogout}>Log out</MenuItem>
              </Menu>
            </>
          ) : (
            <RouterLink to="/login">
              <Button sx={{ justifyContent: "right" }} startIcon={<Login />}>
                Login
              </Button>
            </RouterLink>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default CustomAppBar;
