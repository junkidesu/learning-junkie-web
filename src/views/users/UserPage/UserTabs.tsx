import {
  Container,
  Typography,
  Card,
  Box,
  Tabs,
  Tab,
  Stack,
  Paper,
  LinearProgress,
  Button,
  Divider,
} from "@mui/material";
import { useState } from "react";
import CoursesGrid from "../../../components/courses/CoursesGrid";
import TabPanel from "../../../components/custom/TabPanel";
import LoadingCoursesGrid from "../../../components/loading/LoadingCoursesGrid";
import {
  useGetUserEnrollmentsQuery,
  useGetTaughtCoursesQuery,
} from "../../../services/users.service";
import { User, Role, Progress } from "../../../types";
import { a11yProps } from "../../../util";
import useAuthUser from "../../../hooks/useAuthUser";
import { useGetSelfProgressQuery } from "../../../services/self.service";
import { WorkspacePremium } from "@mui/icons-material";
import { useCompleteCourseMutation } from "../../../services/courses.service";
import { useNavigate } from "react-router-dom";

const Enrollments = ({ user }: { user: User }) => {
  const { data: enrollments, isLoading } = useGetUserEnrollmentsQuery(user.id);

  const courses = enrollments?.map((e) => e.course);

  return (
    <Container sx={{ alignItems: "center" }}>
      {isLoading && <LoadingCoursesGrid />}

      {enrollments &&
        courses &&
        (enrollments.length === 0 ? (
          <Typography>This user is not enrolled in any course.</Typography>
        ) : (
          <CoursesGrid courses={courses} />
        ))}
    </Container>
  );
};

const TaughtCourses = ({ user }: { user: User }) => {
  const { data: courses, isLoading } = useGetTaughtCoursesQuery(user.id);

  return (
    <Container sx={{ alignItems: "center" }}>
      {isLoading && <LoadingCoursesGrid />}

      {courses &&
        (courses.length === 0 ? (
          <Typography>This user does not teach any course.</Typography>
        ) : (
          <CoursesGrid courses={courses} />
        ))}
    </Container>
  );
};

const ProgressTab = () => {
  const { data: progress, isLoading, isError } = useGetSelfProgressQuery();

  if (isLoading) return <Typography>Loading progress...</Typography>;

  if (isError || !progress)
    return <Typography>Some error has occurred!</Typography>;

  return (
    <Stack gap={2}>
      {progress.map((p) => (
        <ProgressItem key={p.course.id} progress={p} />
      ))}
    </Stack>
  );
};

const serverUrl = import.meta.env.VITE_BACKEND_URL;

const ProgressItem = ({ progress }: { progress: Progress }) => {
  const { courseCompletions } = useAuthUser();

  const navigate = useNavigate();

  const [completeCourse] = useCompleteCourseMutation();

  if (!courseCompletions) return null;

  const handleCompleteCourse = async () => {
    try {
      await completeCourse(progress.course.id).unwrap();
      console.log("Success!");
    } catch (error) {
      console.error(error);
    }
  };

  const completedLessonsPercentage =
    progress.course.totalLessonsNum === 0
      ? 100
      : Math.ceil(
          (100 * progress.lessonsCompleted) / progress.course.totalLessonsNum
        );
  const completedExercisesPercentage =
    progress.course.totalExercisesNum === 0
      ? 100
      : Math.ceil(
          (100 * progress.exercisesCompleted) /
            progress.course.totalExercisesNum
        );

  const areRequirementsMet =
    completedLessonsPercentage >
      progress.course.completionRequirements.lessonPercentage &&
    completedExercisesPercentage >
      progress.course.completionRequirements.exercisePercentage;

  const completion = courseCompletions.find(
    (cc) => cc.course.id === progress.course.id
  );

  return (
    <Paper square={false} sx={{ p: 2 }}>
      <Stack gap={2}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h6">{progress.course.title}</Typography>

          {completion && (
            <Button
              variant="contained"
              href={`${serverUrl}/certificates/${completion.id}`}
              target="_blank"
              startIcon={<WorkspacePremium />}
              onClick={() => console.log("Go to certificate")}
            >
              Certificate
            </Button>
          )}

          {!completion && areRequirementsMet && (
            <Button
              variant="contained"
              startIcon={<WorkspacePremium />}
              onClick={handleCompleteCourse}
            >
              Get Certificate
            </Button>
          )}

          {!completion && !areRequirementsMet && (
            <Button
              variant="contained"
              onClick={() => navigate(`/courses/${progress.course.id}`)}
            >
              Continue
            </Button>
          )}
        </Stack>

        <Divider />

        <Stack direction="row" gap={2} alignItems="center">
          <Typography>
            Lessons: {progress.lessonsCompleted}/
            {progress.course.totalLessonsNum}
          </Typography>

          <LinearProgress
            variant="determinate"
            value={completedLessonsPercentage}
            sx={{ flexGrow: 1 }}
          />

          <Typography>
            {completedLessonsPercentage}
            {"%"}
          </Typography>
        </Stack>

        <Stack direction="row" gap={2} alignItems="center">
          <Typography>
            Exercises: {progress.exercisesCompleted}/
            {progress.course.totalExercisesNum}
          </Typography>

          <LinearProgress
            variant="determinate"
            value={completedExercisesPercentage}
            sx={{ flexGrow: 1 }}
          />

          <Typography>
            {completedExercisesPercentage}
            {"%"}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

const UserTabs = ({ user }: { user: User }) => {
  const [value, setValue] = useState(0);

  const { authUser } = useAuthUser();

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const isSameUser = authUser?.id === user.id;
  const isInstructor = user.role === Role.Instructor;

  return (
    <Card sx={{ width: "100%", mb: 2 }} variant="outlined">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
        >
          {isInstructor && <Tab label="Teaches" {...a11yProps(0)} />}
          <Tab label="Enrollments" {...a11yProps(1)} />
          {isSameUser && <Tab label="Progress" {...a11yProps(2)} />}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <TaughtCourses user={user} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Enrollments user={user} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ProgressTab />
      </TabPanel>
    </Card>
  );
};

export default UserTabs;
