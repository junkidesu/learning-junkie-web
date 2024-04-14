import { VisibilityOff, Visibility, LockTwoTone } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  Menu,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Education, NewUser } from "../types";
import {
  useSignUpMutation,
  useUploadAvatarMutation,
} from "../services/users.service";
import { useNavigate } from "react-router-dom";
import usePickImage from "../hooks/usePickImage";
import CollapseAlert from "../components/CollapseAlert";
import useAlert from "../hooks/useAlert";
import useAuthentication from "../hooks/useAuthentication";

const SignUpPage = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [education, setEducation] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState<File | undefined>();

  const navigate = useNavigate();

  const { showAlert } = useAlert();

  const [signup, { isLoading: signingUp }] = useSignUpMutation();
  const [uploadAvatar, { isLoading: uploadingAvatar }] =
    useUploadAvatarMutation();
  const { authenticate, signingIn } = useAuthentication();

  const { openImagePicker, reset, imageContent } = usePickImage({
    image: avatar,
    setImage: setAvatar,
  });

  const handleChange = (event: SelectChangeEvent<typeof education>) => {
    setEducation(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newUser: NewUser = {
      name,
      email,
      education: !education ? undefined : (education as Education),
      password,
    };

    try {
      const addedUser = await signup(newUser).unwrap();

      console.log("Successfully signed up!");

      await authenticate({ email, password });

      if (avatar) {
        console.log("Uploading avatar");

        const body = new FormData();

        body.append("file", avatar);

        await uploadAvatar({ id: addedUser.id, body });

        console.log("Successfully uploaded!");
      }

      navigate("/");
    } catch (error) {
      console.error(error);
      showAlert({ severity: "error" });
    }
  };

  const handleChoose = () => {
    openImagePicker();
    setAnchorEl(null);
  };

  const handleReset = () => {
    reset();
    setAvatar(undefined);
    setAnchorEl(null);
  };

  const chosenAvatar = avatar && imageContent;

  const isLoading = signingUp || signingIn || uploadingAvatar;

  return (
    <Container>
      <CollapseAlert />

      <Stack sx={{ width: "100%" }}>
        <Paper sx={{ p: 2 }}>
          <Stack
            component="form"
            gap={4}
            sx={{
              p: 3,
              alignItems: "center",
            }}
            onSubmit={handleSubmit}
          >
            <LockTwoTone />

            <Typography variant="h5">Sign up</Typography>

            <Menu
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={handleChoose}>Choose</MenuItem>
              <MenuItem onClick={handleReset} disabled={!avatar}>
                Reset
              </MenuItem>
            </Menu>

            <Stack
              direction={{ md: "row", xs: "column" }}
              sx={{ width: "100%", alignItems: "center" }}
              gap={2}
            >
              <Tooltip title="Choose Avatar">
                <IconButton
                  sx={{ p: 0 }}
                  onClick={(e) => setAnchorEl(e.currentTarget)}
                  disabled={isLoading}
                >
                  <Avatar
                    src={chosenAvatar}
                    sx={{
                      width: { xs: 100, md: 150 },
                      height: { xs: 100, md: 150 },
                    }}
                  />
                </IconButton>
              </Tooltip>

              <Stack gap={4} sx={{ width: "100%" }}>
                <TextField
                  variant="outlined"
                  label="Full name"
                  required
                  fullWidth
                  helperText="Please enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                />

                <TextField
                  variant="outlined"
                  label="Email"
                  type="email"
                  required
                  fullWidth
                  helperText="Please enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </Stack>
            </Stack>

            <FormControl fullWidth disabled={isLoading}>
              <InputLabel id="demo-simple-select-label">Education</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={education}
                label="Education"
                onChange={handleChange}
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
              >
                <MenuItem value={""}>
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Bachelor">Bachelor</MenuItem>
                <MenuItem value="Master">Master</MenuItem>
                <MenuItem value="PhD">PhD</MenuItem>
              </Select>
              <FormHelperText>
                Please select your level of education (if any)
              </FormHelperText>
            </FormControl>

            <FormControl
              variant="outlined"
              required
              fullWidth
              disabled={isLoading}
            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText>Please enter your password</FormHelperText>
            </FormControl>

            <Box sx={{ position: "relative" }}>
              <Button type="submit" variant="contained" disabled={isLoading}>
                Sign up
              </Button>

              {isLoading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              )}
            </Box>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
};

export default SignUpPage;
