import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  Container,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteAvatarMutation,
  useGetUserByIdQuery,
  useGetUserCoursesQuery,
  useUploadAvatarMutation,
} from "../services/users.service";
import { nameInitials, stringToColor } from "../util";
import { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import LoadingCourseCard from "../components/LoadingCourseCard";
import { User } from "../types";
import universityLogo from "../assets/university-logo.jpg";
import useAuthUser from "../hooks/useAuthUser";
import ProgressList from "../components/ProgressList";
import usePickImage from "../hooks/usePickImage";

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
  const [value, setValue] = useState(0);

  const { authUser } = useAuthUser();

  const { data: courses, isLoading } = useGetUserCoursesQuery(user.id);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const isSameUser = authUser?.id === user.id;

  return (
    <Card sx={{ width: "100%" }} variant="outlined">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Enrollments" {...a11yProps(0)} />
          <Tab label="Progress" {...a11yProps(1)} disabled={!isSameUser} />
          <Tab label="Solutions" {...a11yProps(2)} disabled={!isSameUser} />
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
              {courses.length === 0 ? (
                <Typography sx={{ p: 2 }}>
                  This user is not enrolled in any course
                </Typography>
              ) : (
                courses.map((course) => (
                  <Grid item key={course.id} xs={4}>
                    <CourseCard course={course} />
                  </Grid>
                ))
              )}
            </Grid>
          )}
        </Container>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ProgressList />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Typography>Solutions</Typography>
      </CustomTabPanel>
    </Card>
  );
};

const UserPage = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const [avatar, setAvatar] = useState<File | undefined>();

  const { authUser } = useAuthUser();

  const userId = useParams().id;
  const navigate = useNavigate();

  const {
    data: user,
    isLoading,
    isError,
  } = useGetUserByIdQuery(Number(userId), { skip: !userId });

  const [uploadAvatar] = useUploadAvatarMutation();
  const [deleteAvatar] = useDeleteAvatarMutation();

  const { openImagePicker } = usePickImage({
    image: avatar,
    setImage: setAvatar,
  });

  useEffect(() => {
    const handleUploadAvatar = async () => {
      if (avatar) {
        const formData = new FormData();

        formData.append("file", avatar);

        try {
          console.log("Uploading");

          await uploadAvatar({ id: user!.id, body: formData }).unwrap();

          console.log("Success!");
        } catch (error) {
          console.log(error);
        }
      }
    };

    if (avatar) {
      handleUploadAvatar();
    }
  }, [avatar, user, uploadAvatar]);

  if (!userId) return null;

  if (isLoading) return <Typography>Loading...</Typography>;

  if (isError || !user)
    return <Typography>Some error has occurred!</Typography>;

  const isSameUser = authUser?.id === user.id;

  const handleChoose = () => {
    if (isSameUser) {
      openImagePicker();
      setAnchorEl(null);
    }
  };

  const handleRemove = async () => {
    if (isSameUser) {
      await deleteAvatar(user.id);
      console.log("Success");
    }
  };

  return (
    <Container>
      <Stack gap={3}>
        <Paper sx={{ p: 2 }}>
          <Stack gap={2}>
            <Stack direction="row" sx={{ alignItems: "center" }}>
              <IconButton
                sx={{ width: 150, height: 150, p: 0, mr: 3 }}
                onClick={
                  isSameUser ? (e) => setAnchorEl(e.currentTarget) : undefined
                }
                disabled={!isSameUser}
              >
                {user.avatar ? (
                  <Avatar sx={{ width: 150, height: 150 }} src={user.avatar} />
                ) : (
                  <Avatar
                    sx={{
                      width: 150,
                      height: 150,
                      bgcolor: stringToColor(user.name),
                    }}
                  >
                    <Typography variant="h2">
                      {nameInitials(user.name)}
                    </Typography>
                  </Avatar>
                )}
              </IconButton>

              <Menu
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                anchorEl={anchorEl}
              >
                <MenuItem onClick={handleChoose}>Update</MenuItem>
                <MenuItem onClick={handleRemove} disabled={!user.avatar}>
                  <Typography color="error">Remove</Typography>
                </MenuItem>
              </Menu>

              <Stack sx={{ flexGrow: 1 }}>
                <Typography variant="h3">{user.name}</Typography>
                <Typography variant="h6">{user.role}</Typography>
              </Stack>

              {user.university && (
                <Card elevation={5}>
                  <CardActionArea
                    sx={{ p: 1 }}
                    onClick={() =>
                      navigate(`/universities/${user.university!.id}`)
                    }
                  >
                    <Stack
                      direction="row"
                      gap={2}
                      sx={{ alignItems: "center" }}
                    >
                      <Avatar src={user.university.logo || universityLogo} />
                      {user.university.name}
                    </Stack>
                  </CardActionArea>
                </Card>
              )}
            </Stack>

            <Divider />

            <Typography>
              {user.name} has been a member of Learning Junkie since{" "}
              {new Date(user.joined).toLocaleDateString()}
            </Typography>
          </Stack>
        </Paper>

        <UserTabs user={user} />
      </Stack>
    </Container>
  );
};

export default UserPage;
