import {
  Button,
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
} from "@mui/material";
import education from "../assets/education.jpg";
import { LockTwoTone, Visibility, VisibilityOff } from "@mui/icons-material";
import React, { useState } from "react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Logging in!");
  };

  return (
    <Container sx={{ width: "fit-content" }}>
      <Paper square={false} sx={{ overflow: "hidden", width: "fit-content" }}>
        <Stack direction="row">
          <img
            src={education}
            style={{ maxWidth: "400px", objectFit: "cover" }}
          />

          <Stack
            component="form"
            onSubmit={handleLogin}
            sx={{
              p: 4,
              gap: 3,
              justifyContent: "center",
            //   alignItems: "center",
            }}
          >
            <LockTwoTone />

            <Typography variant="h5">Sign in</Typography>

            <TextField
              label="Email"
              required
              type="email"
              helperText="Please enter your email"
            />

            <FormControl variant="outlined" required>
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                label="Password"
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

            <Button type="submit" variant="contained">
              Login
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Container>
  );
};

export default LoginPage;
