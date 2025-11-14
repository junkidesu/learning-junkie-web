import { CloseTwoTone, VisibilityOff, Visibility } from "@mui/icons-material";
import {
  SelectChangeEvent,
  Container,
  Collapse,
  Alert,
  IconButton,
  Stack,
  Paper,
  Typography,
  MenuItem,
  Avatar,
  TextField,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  OutlinedInput,
  InputAdornment,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Education, NewUser } from "../../types";
import {
  useAddInstructorMutation,
  useGetUniversityByIdQuery,
} from "../../services/universities.service";

const NewInstructorPage = () => {
  const [alertOpen, setAlertOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [education, setEducation] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const id = useParams().id;

  const {
    data: university,
    isLoading,
    isError,
  } = useGetUniversityByIdQuery(Number(id), {
    skip: !id,
  });

  const navigate = useNavigate();

  const [addInstructor] = useAddInstructorMutation();

  if (isLoading) return <Typography>Loading...</Typography>;

  if (isError || !university)
    return <Typography>Some error has occurred!</Typography>;

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
      await addInstructor({
        id: university.id,
        body: newUser,
      }).unwrap();

      console.log("Successfully signed up!");

      navigate(`/admin`);
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
            <Stack direction="row" sx={{ alignItems: "center" }}>
              <Typography variant="h5" sx={{ mr: 2 }}>
                Add Instructor to {university.name}
              </Typography>

              <Avatar src={university.logo} />
            </Stack>

            <TextField
              variant="outlined"
              label="Full name"
              required
              fullWidth
              helperText="Please enter the full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <TextField
              variant="outlined"
              label="Email"
              type="email"
              required
              fullWidth
              helperText="Please enter the email"
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
                required
              >
                <MenuItem value={""}>
                  <em>None</em>
                </MenuItem>
                <MenuItem value={"Bachelor"}>Bachelor</MenuItem>
                <MenuItem value={"Master"}>Master</MenuItem>
                <MenuItem value={"PhD"}>PhD</MenuItem>
              </Select>
              <FormHelperText>
                Please select the level of education
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
              <FormHelperText>Please enter the password</FormHelperText>
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

export default NewInstructorPage;
