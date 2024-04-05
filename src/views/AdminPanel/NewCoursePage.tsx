import {
  Alert,
  Avatar,
  Button,
  Collapse,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  useGetUniversitiesQuery,
  useGetUniversityInsturctorsQuery,
} from "../../services/universities.service";
import { CloseTwoTone } from "@mui/icons-material";
import { FormEvent, useEffect, useState } from "react";
import {
  useAddCourseMutation,
  useUploadBannerMutation,
} from "../../services/courses.service";
import useAuthUser from "../../hooks/useAuthUser";
import { Difficulty, Role } from "../../types";

import courseBanner from "../../assets/education.jpg";
import { useNavigate } from "react-router-dom";
import usePickImage from "../../hooks/usePickImage";

import universityLogo from "../../assets/university-logo.jpg";
import { nameInitials } from "../../util";

const NewCoursePage = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>();

  const [banner, setBanner] = useState<File | undefined>();

  const [alertOpen, setAlertOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Beginner);
  const [university, setUniversity] = useState<number>();
  const [instructor, setInstructor] = useState<number>();
  const [universitiesLoaded, setUniversitiesLoaded] = useState(false);
  const [instructorsLoaded, setInstructorsLoaded] = useState(false);

  const { existsId, userLoading, authUser, userError } = useAuthUser();

  const { data: universities, isError } = useGetUniversitiesQuery();
  const { data: instructors } = useGetUniversityInsturctorsQuery(
    Number(university),
    {
      skip: !university,
    }
  );

  useEffect(() => {
    if (universities && universities.length > 0) {
      setUniversity(universities[0].id);
      setUniversitiesLoaded(true);
    }
  }, [universities]);

  useEffect(() => {
    if (university && instructors && instructors.length > 0) {
      setInstructor(instructors[0].id);
      setInstructorsLoaded(true);
    }
  }, [university, instructors]);

  const navigate = useNavigate();

  const [addCourse] = useAddCourseMutation();
  const [uploadBanner] = useUploadBannerMutation();

  const { openImagePicker, reset, imageContent } = usePickImage({
    image: banner,
    setImage: setBanner,
  });

  if (!existsId) return null;

  if (userLoading) return <Typography>Loading...</Typography>;

  if (!authUser || userError)
    return <Typography>Some error has occurred</Typography>;

  if (authUser.role !== Role.Admin) return null;

  if (isError || !universities)
    return <Typography>Some error has occurred!</Typography>;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(title, description);

    try {
      const addedCourse = await addCourse({
        id: university as number,
        body: {
          title,
          description,
          difficulty,
          instructorId: instructor as number,
        },
      }).unwrap();

      console.log("Course added!");

      if (banner) {
        const body = new FormData();

        body.append("file", banner);

        await uploadBanner({ id: addedCourse.id, body });
      }

      navigate(`/admin`);
    } catch (error) {
      setAlertOpen(true);
      console.error(error);
    }
  };

  const handleChange = (e: SelectChangeEvent<typeof difficulty>) => {
    setDifficulty(e.target.value as Difficulty);
  };

  const handleChoose = () => {
    openImagePicker();
    setAnchorEl(null);
  };

  const handleReset = () => {
    reset();
    setBanner(undefined);
    setAnchorEl(null);
  };

  const chosenBanner = banner && imageContent;

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

      <Paper sx={{ overflow: "hidden" }}>
        <Tooltip title="Course Banner">
          <img
            src={chosenBanner || courseBanner}
            height={200}
            width="100%"
            style={{ objectFit: "cover" }}
            onClick={(e) => setAnchorEl(e.currentTarget)}
          />
        </Tooltip>

        <Menu
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
        >
          <MenuItem onClick={handleChoose}>Choose</MenuItem>
          <MenuItem onClick={handleReset} disabled={!banner}>
            Reset
          </MenuItem>
        </Menu>

        <Stack
          component="form"
          gap={4}
          sx={{ p: 3, alignItems: "center" }}
          onSubmit={handleSubmit}
        >
          <Typography variant="h5">Add a Course</Typography>

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

          <FormControl fullWidth required>
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

          {universitiesLoaded && (
            <FormControl fullWidth required>
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
                    <Stack direction="row" sx={{ alignItems: "center" }}>
                      <Avatar
                        src={u.logo || universityLogo}
                        sx={{ height: 25, width: 25, mr: 1 }}
                      />

                      <Typography>{u.name}</Typography>
                    </Stack>
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Please select the university</FormHelperText>
            </FormControl>
          )}

          {instructorsLoaded && instructors && instructors.length > 0 && (
            <FormControl fullWidth required>
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
                {instructors.map((ins) => (
                  <MenuItem key={ins.id} value={ins.id}>
                    <Stack direction="row" sx={{ alignItems: "center" }}>
                      {ins.avatar ? (
                        <Avatar
                          src={ins.avatar}
                          sx={{ height: 25, width: 25, mr: 1 }}
                        />
                      ) : (
                        <Avatar sx={{ height: 25, width: 25, mr: 1 }}>
                          <Typography variant="body2">
                            {nameInitials(ins.name)}
                          </Typography>
                        </Avatar>
                      )}

                      <Typography>{ins.name}</Typography>
                    </Stack>
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
