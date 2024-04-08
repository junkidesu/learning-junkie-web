import { MenuRounded, PlayLesson, School } from "@mui/icons-material";
import { Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavMenu = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | undefined>();

  const open = Boolean(anchorEl);

  const navigate = useNavigate();

  const handleClose = () => {
    setAnchorEl(undefined);
  };

  return (
    <Box sx={{ float: "right" }}>
      <IconButton
        sx={{ display: { xs: "flex", md: "none" } }}
        color="inherit"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <MenuRounded color="inherit" />
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
        <MenuItem>
          <Button
            startIcon={<PlayLesson />}
            color="inherit"
            onClick={() => {
              navigate(`/courses`);
              handleClose();
            }}
          >
            Courses
          </Button>
        </MenuItem>

        <MenuItem>
          <Button
            startIcon={<School />}
            color="inherit"
            onClick={() => {
              navigate(`/universities`);
              handleClose();
            }}
          >
            Universities
          </Button>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default NavMenu;
