import {
  Alert,
  Button,
  Collapse,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  useGetUniversitiesQuery,
  useGetUniversityInsturctorsQuery,
} from "../../services/universities.service";
import { CloseTwoTone } from "@mui/icons-material";
import { FormEvent, useState } from "react";
import { useAddCourseMutation } from "../../services/courses.service";
import useAuthUser from "../../hooks/useAuthUser";
import { Difficulty, Role } from "../../types";

const NewCoursePage = () => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Beginner);
  const [university, setUniversity] = useState<number>(1);
  const [instructor, setInstructor] = useState<number>(0);

  const { existsId, userLoading, authUser, userError } = useAuthUser();

  const { data: universities, isError } = useGetUniversitiesQuery();
  const { data: instructors } = useGetUniversityInsturctorsQuery(university, {
    skip: !university,
  });

  const [addCourse] = useAddCourseMutation();

  if (!existsId) return null;

  if (userLoading) return <Typography>Loading...</Typography>;

  if (!authUser || userError)
    return <Typography>Some error has occurred</Typography>;

  if (authUser.role !== Role.Admin) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(title, description);

    try {
      await addCourse({
        id: university,
        body: {
          title,
          description,
          difficulty,
          instructorId: instructor,
        },
      }).unwrap();

      console.log("Success!");
    } catch (error) {
      setAlertOpen(true);
      console.error(error);
    }
  };

  const handleChange = (e: SelectChangeEvent<typeof difficulty>) => {
    setDifficulty(e.target.value as Difficulty);
  };

  if (isError || !universities)
    return <Typography>Some error has occurred!</Typography>;

  return (
    <Stack>
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
          Something went wrong!
        </Alert>
      </Collapse>

      <Paper sx={{ p: 2 }}>
        <Stack
          component="form"
          gap={4}
          sx={{ p: 3, alignItems: "center" }}
          onSubmit={handleSubmit}
        >
          <Typography variant="h5">Add a University</Typography>

          <TextField
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            label="Course Title"
            helperText="Please enter the name of the university"
          />

          <TextField
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            multiline
            minRows={3}
            label="Course Description"
            helperText="Please enter the name of the university"
          />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={difficulty}
              label="Difficulty"
              onChange={handleChange}
              required
            >
              <MenuItem value={Difficulty.Beginner}>Beginner</MenuItem>
              <MenuItem value={Difficulty.Intermediate}>Intermediate</MenuItem>
              <MenuItem value={Difficulty.Advanced}>Advanced</MenuItem>
            </Select>
            <FormHelperText>
              Please select your level of difficulty
            </FormHelperText>
          </FormControl>

          {universities && (
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">University</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={university}
                label="Difficulty"
                onChange={(e: SelectChangeEvent<number>) =>
                  setUniversity(e.target.value as number)
                }
                required
              >
                {universities.map((u) => (
                  <MenuItem key={u.id} value={u.id}>
                    {u.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Please select the university</FormHelperText>
            </FormControl>
          )}

          {instructors && instructors.length > 0 && (
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Instructor</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={instructor}
                label="Difficulty"
                onChange={(e: SelectChangeEvent<number>) =>
                  setInstructor(e.target.value as number)
                }
                required
              >
                <MenuItem value={0}>
                  <em>Instructor</em>
                </MenuItem>
                {instructors.map((ins) => (
                  <MenuItem key={ins.id} value={ins.id}>
                    {ins.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Please select the university</FormHelperText>
            </FormControl>
          )}

          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </Paper>
    </Stack>
  );
};

export default NewCoursePage;
