import { VisibilityOff, Visibility, LockTwoTone, CloseTwoTone } from "@mui/icons-material";
import {
  Alert,
  Button,
  Collapse,
  Container,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Education, NewUser } from "../types";
import { useSignUpMutation } from "../services/users.service";
import { useAppDispatch } from "../hooks";
import { useLoginMutation } from "../services/auth.service";
import { setAuth } from "../reducers/auth.reducer";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [alertOpen, setAlertOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [education, setEducation] = useState<Education | string>("");
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const [signup] = useSignUpMutation();
  const [login] = useLoginMutation();

  const handleChange = (event: SelectChangeEvent<typeof education>) => {
    setEducation(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newUser: NewUser = {
      name,
      email,
      education: typeof education !== "string" ? education : undefined,
      password,
    };

    try {
      await signup(newUser).unwrap();

      try {
        const authData = await login({ email, password }).unwrap();

        dispatch(setAuth(authData));

        navigate("/");
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.error(error);
      setAlertOpen(true);
    }
  };

  return (
    <Container>
      <Collapse in={alertOpen}>
        <Alert
          severity="error"
          variant="filled"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setAlertOpen(false);
              }}
            >
              <CloseTwoTone fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Something went wrong :(
        </Alert>
      </Collapse>

      <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
        <Paper sx={{ p: 2, width: "500px" }}>
          <Stack
            component="form"
            gap={4}
            sx={{
              p: 3,
              justifyContent: "center",
              alignItems: "center",
            }}
            onSubmit={handleSubmit}
          >
            <LockTwoTone />

            <Typography variant="h5">Sign up</Typography>

            <TextField
              variant="outlined"
              label="Full name"
              required
              fullWidth
              helperText="Please enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            />

            <FormControl fullWidth>
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
                <MenuItem value={Education.Bachelor}>Bachelor</MenuItem>
                <MenuItem value={Education.Master}>Master</MenuItem>
                <MenuItem value={Education.PhD}>PhD</MenuItem>
              </Select>
              <FormHelperText>
                Please select your level of education (if any)
              </FormHelperText>
            </FormControl>

            <FormControl variant="outlined" required fullWidth>
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

            <Button type="submit" variant="contained">
              Sign up
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </Container>
  );
};

export default SignUpPage;
