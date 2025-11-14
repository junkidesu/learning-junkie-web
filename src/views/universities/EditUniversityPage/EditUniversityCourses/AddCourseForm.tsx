import { Add } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Collapse,
  FormControl,
  FormHelperText,
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
import { FormEvent, useEffect, useState } from "react";
import { Difficulty, University } from "../../../../types";
import { defaultCourseBanner2 } from "../../../../assets";
import usePickImage from "../../../../hooks/usePickImage";
import {
  useAddCourseMutation,
  useUploadBannerMutation,
} from "../../../../services/courses.service";
import { useGetUniversityInsturctorsQuery } from "../../../../services/universities.service";
import { nameInitials } from "../../../../util";
import useAlert from "../../../../hooks/useAlert";

const AddCourseForm = ({ university }: { university: University }) => {
  const [open, setOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>();

  const [banner, setBanner] = useState<File | undefined>();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Beginner);
  const [instructor, setInstructor] = useState<number>();
  const [exercisePercentage, setExercisePercentage] = useState<number>();
  const [lessonPercentage, setLessonPercentage] = useState<number>();
  const [instructorsLoaded, setInstructorsLoaded] = useState(false);

  const { data: instructors } = useGetUniversityInsturctorsQuery(university.id);

  useEffect(() => {
    if (instructors && instructors.length > 0) {
      setInstructor(instructors[0].id);
      setInstructorsLoaded(true);
    }
  }, [instructors, setInstructor, setInstructorsLoaded]);

  const { showAlert } = useAlert();
  const [addCourse] = useAddCourseMutation();

  const [uploadBanner] = useUploadBannerMutation();

  const { openImagePicker, reset, imageContent } = usePickImage({
    image: banner,
    setImage: setBanner,
  });

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(title, description);

    try {
      const addedCourse = await addCourse({
        id: university.id,
        body: {
          title,
          description,
          difficulty,
          instructor: instructor as number,
          completionRequirements: {
            exercisePercentage: exercisePercentage as number,
            lessonPercentage: lessonPercentage as number,
            finalProject: true,
          },
        },
      }).unwrap();

      console.log("Course added!");

      if (banner) {
        const body = new FormData();

        body.append("file", banner);

        await uploadBanner({ id: addedCourse.id, body });
      }

      setTitle("");
      setDescription("");
      setExercisePercentage(undefined);
      setLessonPercentage(undefined);

      showAlert({
        severity: "success",
        message: `Added course ${addedCourse.title}!`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const chosenBanner = banner && imageContent;

  return (
    <Stack gap={2}>
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => setOpen(!open)}
      >
        Add Course
      </Button>

      <Collapse in={open}>
        <Paper square={false} sx={{ overflow: "hidden" }} elevation={3}>
          <Tooltip title="Course Banner">
            <img
              src={chosenBanner || defaultCourseBanner2}
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
          <Stack component="form" gap={2} sx={{ p: 2 }} onSubmit={handleSubmit}>
            <TextField
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              label="Title"
              helperText="Please enter the title of the course"
              fullWidth
              required
            />

            <TextField
              value={description}
              onChange={({ target }) => setDescription(target.value)}
              label="Description"
              helperText="Please enter the description of the course"
              fullWidth
              required
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
                <MenuItem value={Difficulty.Intermediate}>
                  Intermediate
                </MenuItem>
                <MenuItem value={Difficulty.Advanced}>Advanced</MenuItem>
              </Select>
              <FormHelperText>
                Please select your level of difficulty
              </FormHelperText>
            </FormControl>

            <TextField
              fullWidth
              value={lessonPercentage}
              onChange={(e) => setLessonPercentage(Number(e.target.value))}
              required
              label="Percentage of Lessons Required"
              helperText="Please enter the percentage of lessons required for completion"
            />

            <TextField
              fullWidth
              value={exercisePercentage}
              onChange={(e) => setExercisePercentage(Number(e.target.value))}
              required
              label="Percentage of Lessons Required"
              helperText="Please enter the percentage of exercises required for completion"
            />

            {instructorsLoaded && instructors && instructors.length > 0 && (
              <FormControl fullWidth required>
                <InputLabel id="demo-simple-select-label">
                  Instructor
                </InputLabel>
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
      </Collapse>
    </Stack>
  );
};

export default AddCourseForm;
