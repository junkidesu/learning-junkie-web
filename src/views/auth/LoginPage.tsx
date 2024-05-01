import {
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
import { defaultCourseBanner2 } from "../../assets";
import { LockTwoTone, Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAlert from "../../hooks/useAlert";
import CollapseAlert from "../../components/custom/CollapseAlert";
import useAuthentication from "../../hooks/useAuthentication";
import ProgressButton from "../../components/custom/ProgressButton";

const LoginPage = () => {
  const theme = useTheme();

  const matches = useMediaQuery(theme.breakpoints.down("md"));

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const navigate = useNavigate();
  const { showAlert } = useAlert();

  const { authenticate, signingIn } = useAuthentication();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Logging in!");

    try {
      await authenticate({ email, password });

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
            src={defaultCourseBanner2}
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
              disabled={signingIn}
            />

            <FormControl
              variant="outlined"
              required
              fullWidth
              disabled={signingIn}
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

            <ProgressButton type="submit" isLoading={signingIn}>
              Log in
            </ProgressButton>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
};

export default LoginPage;
