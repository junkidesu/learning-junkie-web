import { Box, Container, Paper, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import ManageUniversities from "./ManageUniversities";
import TabPanel from "../../../components/custom/TabPanel";
import { a11yProps } from "../../../util";
import ManageCourses from "./ManageCourses";

const AdminPanel = () => {
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container sx={{ mb: 2 }}>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h5">Admin Panel</Typography>

        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Universities" {...a11yProps(0)} />
            <Tab label="Courses" {...a11yProps(1)} />
            <Tab label="Users" {...a11yProps(2)} disabled />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <ManageUniversities />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ManageCourses />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Typography>Users</Typography>
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default AdminPanel;
