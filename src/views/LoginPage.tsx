import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import education from "../assets/education.jpg";
import { LockTwoTone, Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import { useLoginMutation } from "../services/auth.service";
import { useAppDispatch } from "../hooks";
import { setAuth } from "../reducers/auth.reducer";
import { useNavigate } from "react-router-dom";
import storage from "../storage";
import useAlert from "../hooks/useAlert";
import CollapseAlert from "../components/CollapseAlert";

const LoginPage = () => {
  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Logging in!");

    try {
      const authData = await login({ email, password }).unwrap();

      dispatch(setAuth(authData));

      storage.setAuth(authData);

      navigate("/");
    } catch (error) {
      console.error(error);
      showAlert({ severity: "error" });
    }
  };

  return (
    <Container sx={{ width: "fit-content" }}>
      <CollapseAlert />

      <Paper square={false} sx={{ overflow: "hidden", width: "fit-content" }}>
        <Stack direction={{ xs: "column", md: "row" }}>
          <img
            src={education}
            style={{
              maxWidth: "400px",
              width: matches ? "100%" : "initial",
              objectFit: "cover",
            }}
          />

          <Stack
            component="form"
            onSubmit={handleLogin}
            sx={{
              p: 4,
              gap: 3,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LockTwoTone />

            <Typography variant="h5">Sign in</Typography>

            <TextField
              label="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              helperText="Please enter your email"
              fullWidth
              disabled={isLoading}
            />

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
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
              >
                Login
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
        </Stack>
      </Paper>
    </Container>
  );
};

export default LoginPage;
