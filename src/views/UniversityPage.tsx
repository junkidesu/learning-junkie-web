import {
  Avatar,
  Box,
  Card,
  Container,
  Divider,
  Grid,
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
} from "../services/universities.service";
import universityLogo from "../assets/university-logo.jpg";
import { useState } from "react";
import { University } from "../types";
import LoadingCourseCard from "../components/LoadingCourseCard";
import CoursesGrid from "../components/CoursesGrid";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

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
      <CustomTabPanel value={value} index={0}>
        <Container sx={{ alignItems: "center" }}>
          {isLoading && (
            <Grid container spacing={3}>
              {Array(6).map((n) => (
                <Grid item key={n} xs={4}>
                  <LoadingCourseCard />
                </Grid>
              ))}
            </Grid>
          )}

          {courses &&
            (courses.length === 0 ? (
              <Typography>
                This university does not offer any course.
              </Typography>
            ) : (
              <CoursesGrid courses={courses} />
            ))}
        </Container>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Typography>Instructors</Typography>
      </CustomTabPanel>
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
            <Stack direction="row" sx={{ alignItems: "center" }}>
              <Avatar
                sx={{ width: 150, height: 150, mr: 3 }}
                src={university.logo || universityLogo}
              />
              <Stack height="100%">
                <Typography variant="h3">{university.name}</Typography>
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
