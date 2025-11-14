import { PersonAdd, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Stack,
  Button,
  Collapse,
  TextField,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { useAddInstructorMutation } from "../../../../services/universities.service";
import { NewUser, Education } from "../../../../types";

const AddInstructorForm = ({ universityId }: { universityId: number }) => {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [education, setEducation] = useState<string>("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [addInstructor] = useAddInstructorMutation();

  const handleEducationChange = (
    event: SelectChangeEvent<typeof education>
  ) => {
    setEducation(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body: NewUser = {
      email,
      name,
      education: education as Education,
      password,
    };

    try {
      await addInstructor({ id: universityId, body });

      console.log("Success!");

      setEmail("");
      setName("");
      setEducation("");
      setPassword("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Stack gap={2}>
      <Button
        variant="contained"
        startIcon={<PersonAdd />}
        onClick={() => setOpen(!open)}
      >
        Add Instructor
      </Button>

      <Collapse in={open}>
        <Paper elevation={3} square={false} sx={{ p: 2 }}>
          <Stack gap={2} component="form" onSubmit={handleSubmit}>
            <TextField
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              fullWidth
              required
              label="Email"
              helperText="Please enter the email of the university representative"
            />

            <TextField
              value={name}
              onChange={({ target }) => setName(target.value)}
              fullWidth
              required
              label="Name"
              helperText="Please enter the full name of the university representative"
            />

            <FormControl fullWidth required>
              <InputLabel id="demo-simple-select-label">Education</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={education}
                label="Education"
                onChange={handleEducationChange}
              >
                <MenuItem value={""}>
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Bachelor">Bachelor</MenuItem>
                <MenuItem value="Master">Master</MenuItem>
                <MenuItem value="PhD">PhD</MenuItem>
              </Select>
              <FormHelperText>
                Please select the university representative's level of education
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
              Submit
            </Button>
          </Stack>
        </Paper>
      </Collapse>
    </Stack>
  );
};

export default AddInstructorForm;
