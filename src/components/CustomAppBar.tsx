import {
  TipsAndUpdates,
  PlayLesson,
  School,
  Login,
  AppRegistration,
  AdminPanelSettings,
} from "@mui/icons-material";
import {
  AppBar,
  Container,
  Toolbar,
  Button,
  Typography,
  Stack,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks";
import { useState } from "react";
import { removeAuth } from "../reducers/auth.reducer";
import UserAvatar from "./UserAvatar";
import useAuthUser from "../hooks/useAuthUser";
import storage from "../storage";

const CustomAppBar = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined>();
  const open = Boolean(anchorEl);

  const { existsId, authUser, userLoading } = useAuthUser();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    setAnchorEl(undefined);
  };

  const handleLogout = () => {
    handleClose();
    dispatch(removeAuth());
    storage.removeAuth();
    navigate("/login");
  };

  const handleProfile = () => {
    navigate(`/users/${authUser!.id}`);
    handleClose();
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

            {authUser?.role === "Admin" && (
              <RouterLink to="/admin">
                <Button startIcon={<AdminPanelSettings />}>Admin</Button>
              </RouterLink>
            )}
          </Stack>

          {existsId ? (
            <>
              {authUser && !userLoading ? (
                <Tooltip title={authUser.name}>
                  <IconButton
                    sx={{ p: 0 }}
                    onClick={(e) => setAnchorEl(e.currentTarget)}
                  >
                    <UserAvatar user={authUser} />
                  </IconButton>
                </Tooltip>
              ) : (
                <CircularProgress />
              )}

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
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>Account</MenuItem>
                <MenuItem onClick={handleLogout}>Log out</MenuItem>
              </Menu>
            </>
          ) : (
            <Stack direction="row">
              <Button startIcon={<Login />} onClick={() => navigate(`/login`)}>
                Login
              </Button>
              <Button
                startIcon={<AppRegistration />}
                onClick={() => navigate(`/signup`)}
              >
                Sign Up
              </Button>
            </Stack>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default CustomAppBar;
