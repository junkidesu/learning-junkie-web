import {
  Container,
  Typography,
  Card,
  Box,
  Tabs,
  Tab,
  Stack,
} from "@mui/material";
import { useState } from "react";
import CoursesGrid from "../../../components/courses/CoursesGrid";
import TabPanel from "../../../components/custom/TabPanel";
import LoadingCoursesGrid from "../../../components/loading/LoadingCoursesGrid";
import ProgressList from "../../../components/users/ProgressList";
import useAuthUser from "../../../hooks/useAuthUser";
import {
  useGetUserEnrollmentsQuery,
  useGetTaughtCoursesQuery,
  useGetUserSolutionsQuery,
} from "../../../services/users.service";
import { User, Role } from "../../../types";
import { a11yProps } from "../../../util";
import SolutionItem from "../../../components/users/SolutionItem";

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

const UserSolutions = ({ user }: { user: User }) => {
  const {
    data: solutions,
    isLoading,
    isError,
  } = useGetUserSolutionsQuery(user.id);

  if (isLoading) return <Typography>Loading...</Typography>;

  if (isError || !solutions)
    return <Typography>Some error has occurred!</Typography>;

  return (
    <Stack gap={1}>
      {solutions.map((ex) => (
        <SolutionItem exercise={ex} key={ex.id} />
      ))}
    </Stack>
  );
};

const UserTabs = ({ user }: { user: User }) => {
  const [value, setValue] = useState(0);

  const { authUser } = useAuthUser();

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const isSameUser = authUser?.id === user.id;

  return (
    <Card sx={{ width: "100%" }} variant="outlined">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          variant="scrollable"
        >
          <Tab label="Enrollments" {...a11yProps(0)} />
          <Tab label="Progress" {...a11yProps(1)} disabled={!isSameUser} />
          <Tab label="Solutions" {...a11yProps(2)} disabled={!isSameUser} />
          <Tab
            label="Teaches"
            {...a11yProps(3)}
            disabled={user.role !== Role.Instructor}
          />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Enrollments user={user} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ProgressList />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography>
          <UserSolutions user={user} />
        </Typography>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <TaughtCourses user={user} />
      </TabPanel>
    </Card>
  );
};

export default UserTabs;
