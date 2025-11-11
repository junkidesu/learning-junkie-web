import {
  Container,
  Typography,
  Card,
  Stack,
  Paper,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  CardActionArea,
  Divider,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { defaultUniversityLogo } from "../../../assets";
import useAuthUser from "../../../hooks/useAuthUser";
import usePickImage from "../../../hooks/usePickImage";
import {
  useGetUserByIdQuery,
  useDeleteAvatarMutation,
} from "../../../services/users.service";
import { stringToColor, nameInitials } from "../../../util";
import LoadingUserPage from "../../loading/LoadingUserPage";
import UserTabs from "./UserTabs";
import { useUploadAvatarMutation } from "../../../services/self.service";

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

          await uploadAvatar({ body: formData }).unwrap();

          console.log("Success!");

          setAvatar(undefined);
        } catch (error) {
          console.log(error);

          setAvatar(undefined);
        }
      }
    };

    if (avatar) {
      handleUploadAvatar();
    }
  }, [avatar, user, uploadAvatar, setAvatar]);

  if (!userId) return null;

  if (isLoading) return <LoadingUserPage />;

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
      setAnchorEl(null);
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
                      <Avatar
                        src={user.university.logo || defaultUniversityLogo}
                      />
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
