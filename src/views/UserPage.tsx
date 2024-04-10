import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  Container,
  Divider,
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
  useGetTaughtCoursesQuery,
  useGetUserByIdQuery,
  useGetUserCoursesQuery,
  useUploadAvatarMutation,
} from "../services/users.service";
import { nameInitials, stringToColor } from "../util";
import { useEffect, useState } from "react";
import { Role, User } from "../types";
import universityLogo from "../assets/university-logo.jpg";
import useAuthUser from "../hooks/useAuthUser";
import ProgressList from "../components/ProgressList";
import usePickImage from "../hooks/usePickImage";
import CoursesGrid from "../components/CoursesGrid";
import LoadingCoursesGrid from "../components/LoadingCoursesGrid";

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
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

const Enrollments = ({ user }: { user: User }) => {
  const { data: courses, isLoading } = useGetUserCoursesQuery(user.id);

  return (
    <Container sx={{ alignItems: "center" }}>
      {isLoading && <LoadingCoursesGrid />}

      {courses &&
        (courses.length === 0 ? (
          <Typography>This user is not enrolled in any course.</Typography>
        ) : (
          <CoursesGrid courses={courses} />
        ))}
    </Container>
  );
};

const TaughtCourses = ({ user }: { user: User }) => {
  const { data: courses, isLoading } = useGetTaughtCoursesQuery(user.id);

  return (
    <Container sx={{ alignItems: "center" }}>
      {isLoading && <LoadingCoursesGrid />}

      {courses &&
        (courses.length === 0 ? (
          <Typography>This user does not teach any course.</Typography>
        ) : (
          <CoursesGrid courses={courses} />
        ))}
    </Container>
  );
};

const UserTabs = ({ user }: { user: User }) => {
  const [value, setValue] = useState(0);

  const { authUser } = useAuthUser();

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
          variant="scrollable"
        >
          <Tab label="Enrollments" {...a11yProps(0)} />
          <Tab label="Progress" {...a11yProps(1)} disabled={!isSameUser} />
          <Tab label="Solutions" {...a11yProps(2)} disabled />
          <Tab
            label="Teaches"
            {...a11yProps(3)}
            disabled={user.role !== Role.Instructor}
          />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Enrollments user={user} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ProgressList />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Typography>Solutions</Typography>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <TaughtCourses user={user} />
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
          <Stack gap={3}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              sx={{ alignItems: "center" }}
              gap={2}
            >
              <IconButton
                sx={{
                  width: { xs: 80, sm: 115, md: 115 },
                  height: { xs: 80, sm: 115, md: 115 },
                  p: 0,
                }}
                onClick={
                  isSameUser ? (e) => setAnchorEl(e.currentTarget) : undefined
                }
                disabled={!isSameUser}
              >
                {user.avatar ? (
                  <Avatar
                    sx={{
                      width: { xs: 80, sm: 115, md: 115 },
                      height: { xs: 80, sm: 115, md: 115 },
                    }}
                    src={user.avatar}
                  />
                ) : (
                  <Avatar
                    sx={{
                      width: { xs: 80, sm: 115, md: 115 },
                      height: { xs: 80, sm: 115, md: 115 },
                      bgcolor: stringToColor(user.name),
                    }}
                  >
                    <Typography variant="h3">
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

              <Stack
                sx={{
                  flexGrow: 1,
                  alignItems: { xs: "center", md: "initial" },
                }}
              >
                <Typography variant="h3">{user.name}</Typography>
                <Typography variant="h6">{user.role}</Typography>
              </Stack>

              {user.university && (
                <Card
                  elevation={5}
                  sx={{ width: { xs: "100%", md: "fit-content" } }}
                >
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
