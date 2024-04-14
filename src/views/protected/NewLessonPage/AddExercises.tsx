import { Box, Container, Tab, Tabs } from "@mui/material";
import { Lesson } from "../../../types";
import { useState } from "react";
import AddQuestions from "./AddQuestions";
import AddEssays from "./AddEssays";
import AddQuizzes from "./AddQuizzes";

interface Props {
  lesson: Lesson;
}

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

const AddExercises = ({ lesson }: Props) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Container>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs variant="standard" value={activeTab} onChange={handleChange}>
          <Tab label="Questions" {...a11yProps(0)} />
          <Tab label="Essay" {...a11yProps(1)} />
          <Tab label="Quizzes" {...a11yProps(2)} />
        </Tabs>
      </Box>

      <Box>
        <CustomTabPanel value={activeTab} index={0}>
          <AddQuestions lesson={lesson} />
        </CustomTabPanel>
        <CustomTabPanel value={activeTab} index={1}>
          <AddEssays lesson={lesson} />
        </CustomTabPanel>
        <CustomTabPanel value={activeTab} index={2}>
          <AddQuizzes lesson={lesson} />
        </CustomTabPanel>
      </Box>
    </Container>
  );
};

export default AddExercises;
