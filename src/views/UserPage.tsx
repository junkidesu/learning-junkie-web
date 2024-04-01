import {
  Avatar,
  Box,
  Card,
  Container,
  Grid,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import {
  useGetUserByIdQuery,
  useGetUserCoursesQuery,
} from "../services/users.service";
import { nameInitials } from "../util";
import { useState } from "react";
import CourseCard from "../components/CourseCard";
import LoadingCourseCard from "../components/LoadingCourseCard";
import { User } from "../types";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const UserTabs = ({ user }: { user: User }) => {
  const { data: courses, isLoading } = useGetUserCoursesQuery(user.id);
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
          <Tab label="Enrollments" {...a11yProps(0)} />
          <Tab label="Progress" {...a11yProps(1)} disabled />
          <Tab label="Solutions" {...a11yProps(2)} disabled />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Container>
          {isLoading && (
            <Grid container spacing={3}>
              {[1, 2, 3].map((n) => (
                <Grid item key={n} xs={4}>
                  <LoadingCourseCard />
                </Grid>
              ))}
            </Grid>
          )}

          {courses && (
            <Grid container spacing={3}>
              {courses.map((course) => (
                <Grid item key={course.id} xs={4}>
                  <CourseCard course={course} />
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Typography>Progress</Typography>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Typography>Solutions</Typography>
      </CustomTabPanel>
    </Card>
  );
};

const UserPage = () => {
  const userId = useParams().id;

  const {
    data: user,
    isLoading,
    isError,
  } = useGetUserByIdQuery(Number(userId), { skip: !userId });

  if (!userId) return null;

  if (isLoading) return <Typography>Loading...</Typography>;

  if (isError || !user)
    return <Typography>Some error has occurred!</Typography>;

  return (
    <Container>
      <Stack gap={3}>
        <Paper sx={{ p: 2 }}>
          <Stack direction="row" sx={{ alignItems: "center" }}>
            {user.avatar ? (
              <Avatar
                sx={{ width: 150, height: 150, mr: 3 }}
                src={user.avatar}
              />
            ) : (
              <Avatar sx={{ width: 150, height: 150 }}>
                {nameInitials(user.name)}
              </Avatar>
            )}

            <Stack>
              <Typography variant="h3">{user.name}</Typography>
              <Typography variant="h6">{user.role}</Typography>
            </Stack>
          </Stack>
        </Paper>

        <UserTabs user={user} />
      </Stack>
    </Container>
  );
};

export default UserPage;
