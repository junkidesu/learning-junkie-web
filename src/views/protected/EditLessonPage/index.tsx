import {
  Box,
  Container,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetLessonQuery } from "../../../services/lessons.service";
import { useState } from "react";
import EditInformationAndContent from "./EditInformationAndContent";
import EditExercises from "./EditExercises";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
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
};

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

const EditLessonPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const id = useParams().id;

  const number = useParams().number;

  const {
    data: lesson,
    isLoading,
    isError,
  } = useGetLessonQuery(
    { id: Number(id), number: Number(number) },
    { skip: !id || !number }
  );

  if (!id || !number) return null;

  if (isLoading) return <Typography>Loading...</Typography>;

  if (isError || !lesson)
    return <Typography>Some error has occurred!</Typography>;

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Container>
      <Paper sx={{ p: 2 }}>
        <Stack>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs onChange={handleChange} value={activeTab}>
              <Tab label="Information and Content" {...a11yProps(0)} />
              <Tab label="Exercises" {...a11yProps(1)} />
            </Tabs>
          </Box>

          <Box>
            <CustomTabPanel index={0} value={activeTab}>
              <EditInformationAndContent lesson={lesson} />
            </CustomTabPanel>

            <CustomTabPanel index={1} value={activeTab}>
              <EditExercises lesson={lesson} />
            </CustomTabPanel>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};

export default EditLessonPage;
