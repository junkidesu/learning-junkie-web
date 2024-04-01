import { TipsAndUpdates, PlayLesson, School, Login } from "@mui/icons-material";
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
import { useAppDispatch, useAppSelector } from "../hooks";
import { useGetUserByIdQuery } from "../services/users.service";
import { useState } from "react";
import { removeAuth } from "../reducers/auth.reducer";
import UserAvatar from "./UserAvatar";

const CustomAppBar = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined>();
  const open = Boolean(anchorEl);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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
    navigate("/login");
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
                {loggedInUser ? (
                  <Tooltip title={loggedInUser?.name}>
                    <UserAvatar user={loggedInUser} />
                  </Tooltip>
                ) : (
                  <CircularProgress />
                )}
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
