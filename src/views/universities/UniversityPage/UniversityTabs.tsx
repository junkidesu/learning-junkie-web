import {
  Container,
  Typography,
  Stack,
  Card,
  Box,
  Tabs,
  Tab,
} from "@mui/material";
import { useState } from "react";
import CoursesGrid from "../../../components/courses/CoursesGrid";
import TabPanel from "../../../components/custom/TabPanel";
import LoadingCoursesGrid from "../../../components/loading/LoadingCoursesGrid";
import UserItem from "../../../components/users/UserItem";
import {
  useGetUniversityCoursesQuery,
  useGetUniversityInsturctorsQuery,
} from "../../../services/universities.service";
import { University } from "../../../types";
import { a11yProps } from "../../../util";

const UniversityCourses = ({ university }: { university: University }) => {
  const {
    data: courses,
    isLoading,
    isError,
  } = useGetUniversityCoursesQuery(university.id);

  if (isLoading)
    return (
      <Container sx={{ alignItems: "center" }}>
        <LoadingCoursesGrid />
      </Container>
    );

  if (isError || !courses)
    return <Typography>Some error has occurred!</Typography>;

  return (
    <Container sx={{ alignItems: "center" }}>
      {courses.length === 0 ? (
        <Typography>This university does not offer any course.</Typography>
      ) : (
        <CoursesGrid courses={courses} />
      )}
    </Container>
  );
};

const UniversityInstructors = ({ university }: { university: University }) => {
  const {
    data: instructors,
    isLoading,
    isError,
  } = useGetUniversityInsturctorsQuery(university.id);

  if (isLoading) return <Typography>Loading...</Typography>;

  if (isError || !instructors)
    return <Typography>Some error has occurred!</Typography>;

  return (
    <Stack gap={1}>
      {instructors.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </Stack>
  );
};

const UniversityTabs = ({ university }: { university: University }) => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Card sx={{ width: "100%" }} variant="outlined">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Courses" {...a11yProps(0)} />
          <Tab label="Instructors" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <UniversityCourses university={university} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <UniversityInstructors university={university} />
      </TabPanel>
    </Card>
  );
};

export default UniversityTabs;
