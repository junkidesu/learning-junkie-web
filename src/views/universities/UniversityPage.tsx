import {
  Avatar,
  Box,
  Card,
  Container,
  Divider,
  Link,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import {
  useGetUniversityByIdQuery,
  useGetUniversityCoursesQuery,
} from "../../services/universities.service";
import { defaultUniversityLogo } from "../../assets";
import { useState } from "react";
import { University } from "../../types";
import CoursesGrid from "../../components/courses/CoursesGrid";
import LoadingCoursesGrid from "../../components/loading/LoadingCoursesGrid";
import TabPanel from "../../components/custom/TabPanel";
import { a11yProps } from "../../util";

const UniversityTabs = ({ university }: { university: University }) => {
  const { data: courses, isLoading } = useGetUniversityCoursesQuery(
    university.id
  );
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
          <Tab label="Instructors" {...a11yProps(1)} disabled />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Container sx={{ alignItems: "center" }}>
          {isLoading && <LoadingCoursesGrid />}

          {courses &&
            (courses.length === 0 ? (
              <Typography>
                This university does not offer any course.
              </Typography>
            ) : (
              <CoursesGrid courses={courses} />
            ))}
        </Container>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography>Instructors</Typography>
      </TabPanel>
    </Card>
  );
};

const UniversityPage = () => {
  const universityId = useParams().id;

  const {
    data: university,
    isLoading,
    isError,
  } = useGetUniversityByIdQuery(Number(universityId), {
    skip: !universityId,
  });

  if (!universityId) return null;

  if (isLoading && !university) return <Typography>Loading...</Typography>;

  if (!university || isError)
    return <Typography>Some error occurred</Typography>;

  return (
    <Container>
      <Stack gap={3}>
        <Paper sx={{ p: 2 }}>
          <Stack sx={{ gap: 2 }}>
            <Stack
              direction={{ md: "row", xs: "column" }}
              sx={{ alignItems: "center" }}
              gap={3}
            >
              <Avatar
                sx={{ width: 150, height: 150 }}
                src={university.logo || defaultUniversityLogo}
              />
              <Stack
                height="100%"
                sx={{ alignItems: { xs: "center", md: "initial" } }}
              >
                <Typography variant="h5">{university.name}</Typography>
                <Typography>{university.year}</Typography>
                <Link component="a" href={university.url}>
                  {university.url}
                </Link>
              </Stack>
            </Stack>

            <Divider />

            <Typography>
              {university.abbreviation || university.name} has been a member of
              Learning Junkie since{" "}
              {new Date(university.joined).toLocaleDateString()}
            </Typography>
          </Stack>
        </Paper>

        <UniversityTabs university={university} />
      </Stack>
    </Container>
  );
};

export default UniversityPage;
