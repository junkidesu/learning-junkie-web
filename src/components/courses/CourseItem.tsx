import {
  Button,
  Card,
  CardMedia,
  Container,
  Divider,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { Course } from "../../types";
import { DeleteForeverOutlined } from "@mui/icons-material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  useDeleteBannerMutation,
  useDeleteCourseMutation,
  useUploadBannerMutation,
} from "../../services/courses.service";
import { useEffect, useState } from "react";
import { defaultCourseBanner2 } from "../../assets";
import usePickImage from "../../hooks/usePickImage";

const CourseItem = ({ course }: { course: Course }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>();

  const [banner, setBanner] = useState<File | undefined>();

  const [uploadBanner] = useUploadBannerMutation();
  const [deleteBanner] = useDeleteBannerMutation();

  useEffect(() => {
    const handleUploadBanner = async () => {
      if (banner) {
        const formData = new FormData();

        formData.append("file", banner);

        try {
          console.log("Uploading");

          await uploadBanner({ id: course.id, body: formData }).unwrap();

          console.log("Success!");
        } catch (error) {
          console.log(error);
        }
      }
    };

    if (banner) {
      handleUploadBanner();
    }
  }, [banner, course.id, uploadBanner]);

  const { openImagePicker } = usePickImage({
    image: banner,
    setImage: setBanner,
  });

  const navigate = useNavigate();

  const [deleteCourse] = useDeleteCourseMutation();

  const handleDelete = async () => {
    await deleteCourse(course.id);
    console.log("Success!");
  };

  const handleDeleteBanner = async () => {
    await deleteBanner(course.id);
    console.log("Success!");
    setAnchorEl(null);
  };

  const handleUpdateBanner = () => {
    openImagePicker();
    setAnchorEl(null);
  };

  return (
    <Card square={false} elevation={5}>
      <CardMedia
        component="img"
        src={course.banner || defaultCourseBanner2}
        height={200}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      />

      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={handleUpdateBanner}>
          {course.banner ? "Update" : "Upload"}
        </MenuItem>
        <MenuItem onClick={handleDeleteBanner} disabled={!course.banner}>
          <Typography color="error">Remove</Typography>
        </MenuItem>
      </Menu>

      <Stack>
        <Stack direction="row" sx={{ p: 2 }}>
          {/* <Avatar
            sx={{ height: 80, width: 80 }}
            src={course.university.logo || universityLogo}
          /> */}

          <Container>
            <Typography
              sx={{ textDecoration: "none" }}
              variant="h5"
              color="inherit"
            >
              {course.title}
            </Typography>

            <Typography
              component={RouterLink}
              sx={{ textDecoration: "none" }}
              to={`/universities/${course.university.id}`}
              color="inherit"
            >
              {course.university.name}
            </Typography>

            <Typography>{course.enrollmentsCount} people enrolled</Typography>
          </Container>
        </Stack>

        <Divider />

        <Container sx={{ p: 1 }}>
          <Button onClick={() => navigate(`/courses/${course.id}`)}>
            Visit
          </Button>

          <Button onClick={() => navigate(`/courses/${course.id}/edit`)}>
            Manage
          </Button>

          <Button
            color="error"
            sx={{ float: "right" }}
            onClick={handleDelete}
            startIcon={<DeleteForeverOutlined />}
          >
            Delete
          </Button>
        </Container>
      </Stack>
    </Card>
  );
};

export default CourseItem;
