import { Box, Container, Paper, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import useAuthUser from "../../hooks/useAuthUser";
import { Role } from "../../types";
import UniversityList from "./UniversityList";
import ManageCourses from "./ManageCourses";

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
};

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

const AdminPanel = () => {
  const [value, setValue] = useState(0);

  const { existsId, authUser, userLoading } = useAuthUser();

  if (!existsId) return null;

  if (userLoading) return <Typography>Loading...</Typography>;

  if (!authUser) return <Typography>Some error has occurred!</Typography>;

  if (authUser.role !== Role.Admin)
    return <Typography>Unauthorized!</Typography>;

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container>
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

        <CustomTabPanel value={value} index={0}>
          <UniversityList />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <ManageCourses />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Typography>Users</Typography>
        </CustomTabPanel>
      </Paper>
    </Container>
  );
};

export default AdminPanel;
