import {
  Box,
  Tooltip,
  IconButton,
  CircularProgress,
  Menu,
  MenuItem,
  Button,
  Stack,
} from "@mui/material";
import UserAvatar from "../users/UserAvatar";
import useAuthUser from "../../hooks/useAuthUser";
import { Login, AppRegistration, Lock } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuthentication from "../../hooks/useAuthentication";
import useAlert from "../../hooks/useAlert";
import SnackbarAlert from "../custom/SnackbarAlert";

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined>();

  const open = Boolean(anchorEl);

  const { existsId, authUser, userLoading, progressError } = useAuthUser();

  const navigate = useNavigate();

  const { showAlert } = useAlert();

  const { logout } = useAuthentication();

  useEffect(() => {
    if (progressError) {
      logout();

      showAlert({
        message: "Invalid session. Please sign in again",
        severity: "warning",
      });
    }
  }, [progressError, logout, navigate, showAlert]);

  const handleClose = () => {
    setAnchorEl(undefined);
  };

  const handleLogout = () => {
    logout();
    setAnchorEl(undefined);
    navigate("/login");
  };

  const handleProfile = () => {
    navigate(`/users/${authUser!.id}`);
    handleClose();
  };

  if (!existsId)
    return (
      <Box sx={{ float: "right" }}>
        <SnackbarAlert />

        <Stack direction="row" sx={{ display: { xs: "none", md: "flex" } }}>
          <Button
            startIcon={<Login />}
            onClick={() => navigate(`/login`)}
            color="inherit"
          >
            Login
          </Button>
          <Button
            startIcon={<AppRegistration />}
            onClick={() => navigate(`/signup`)}
            color="inherit"
          >
            Sign Up
          </Button>
        </Stack>

        <IconButton
          sx={{ display: { xs: "flex", md: "none" } }}
          color="inherit"
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          <Lock />
        </IconButton>

        <Menu
          open={open}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(undefined)}
        >
          <MenuItem>
            <Button
              startIcon={<Login />}
              onClick={() => {
                navigate(`/login`);
                setAnchorEl(undefined);
              }}
              color="inherit"
            >
              Login
            </Button>
          </MenuItem>
          <MenuItem>
            <Button
              startIcon={<AppRegistration />}
              onClick={() => {
                navigate(`/signup`);
                setAnchorEl(undefined);
              }}
              color="inherit"
            >
              Sign Up
            </Button>
          </MenuItem>
        </Menu>
      </Box>
    );
  return (
    <Box sx={{ float: "right" }}>
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
        {/* <MenuItem onClick={handleClose}>Account</MenuItem> */}
        <MenuItem onClick={handleLogout}>Log out</MenuItem>
      </Menu>
    </Box>
  );
};

export default ProfileMenu;
