import {
  Box,
  Container,
  Divider,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetUniversityByIdQuery } from "../../../services/universities.service";
import EditUniversityForm from "./EditUniversityForm";
import NewUniversityRepresentatives from "../NewUniversityPage/NewUniversityRepresentatives";
import NewUniversityInstructors from "../NewUniversityPage/NewUniversityInstructors";
import TabPanel from "../../../components/custom/TabPanel";
import { a11yProps } from "../../../util";
import { useState } from "react";
import EditUniversityCourses from "./EditUniversityCourses";

const EditUniversityPage = () => {
  const [tab, setTab] = useState(0);

  const universityId = useParams().id;

  const {
    data: university,
    isLoading,
    isError,
  } = useGetUniversityByIdQuery(Number(universityId), { skip: !universityId });

  if (!universityId) return null;

  if (isLoading) return <Typography>Loading university...</Typography>;

  if (isError || !university)
    return <Typography>Some error has occurred!</Typography>;

  return (
    <Container sx={{ mb: 2 }}>
      <Stack gap={2}>
        <Paper square={false} sx={{ p: 2 }}>
          <Stack gap={2}>
            <Typography variant="h6">
              Edit {university.name} Information
            </Typography>

            <Divider />

            <EditUniversityForm university={university} />
          </Stack>
        </Paper>

        <Paper square={false} sx={{ p: 0 }}>
          <Box>
            <Box sx={{ borderBottom: 1, borderBottomColor: "divider" }}>
              <Tabs onChange={(_event, newValue) => setTab(newValue)}>
                <Tab label="Representatives" {...a11yProps(0)} />
                <Tab label="Instructors" {...a11yProps(1)} />
                <Tab label="Courses" {...a11yProps(2)} />
              </Tabs>
            </Box>

            <TabPanel index={0} value={tab}>
              <NewUniversityRepresentatives universityId={university.id} />
            </TabPanel>
            <TabPanel index={1} value={tab}>
              <NewUniversityInstructors universityId={university.id} />
            </TabPanel>
            <TabPanel index={2} value={tab}>
              <EditUniversityCourses university={university} />
            </TabPanel>
          </Box>
        </Paper>
      </Stack>
    </Container>
  );
};

export default EditUniversityPage;
