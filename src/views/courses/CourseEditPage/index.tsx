import { Typography, Container, Paper, Box, Tabs, Tab } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { defaultCourseBanner2 } from "../../../assets";
import TabPanel from "../../../components/custom/TabPanel";
import { useGetCourseByIdQuery } from "../../../services/courses.service";
import { a11yProps } from "../../../util";
import EditCourseChapters from "./EditCourseChapters";
import EditCourseInformation from "./EditCourseInformation";
import CourseEnrollments from "./CourseEnrollments";
import PendingSubmissions from "./PendingSubmissions";

const CourseEditPage = () => {
  const courseId = useParams().id;

  const [tab, setTab] = useState<number>(0);

  const {
    data: course,
    isLoading,
    isError,
  } = useGetCourseByIdQuery(Number(courseId!), { skip: !courseId });

  if (!courseId) return null;

  if (isLoading) return <Typography>Loading...</Typography>;

  if (isError || !course)
    return <Typography>Some error has occurred!</Typography>;

  return (
    <Container sx={{ p: 0, mb: 2 }}>
      <Paper square={false} sx={{ overflow: "hidden" }}>
        <img
          src={course.banner || defaultCourseBanner2}
          width="100%"
          height="250px"
          style={{ overflow: "hidden", objectFit: "cover" }}
        />

        <EditCourseInformation course={course} />

        <Container sx={{ p: 2 }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              variant="scrollable"
              value={tab}
              onChange={(_event, newValue) => setTab(newValue)}
            >
              <Tab label="Lessons" {...a11yProps(0)} />
              <Tab label="Enrollments" {...a11yProps(1)} />
              <Tab label="Pending Submissions" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={tab} index={0}>
            <EditCourseChapters course={course} />
          </TabPanel>

          <TabPanel value={tab} index={1}>
            <CourseEnrollments course={course} />
          </TabPanel>

          <TabPanel value={tab} index={2}>
            <PendingSubmissions course={course} />
          </TabPanel>
        </Container>
      </Paper>
    </Container>
  );
};

export default CourseEditPage;
