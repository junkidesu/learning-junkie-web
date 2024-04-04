import {
  Avatar,
  Button,
  Card,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { Course } from "../../types";
import { DeleteForeverOutlined } from "@mui/icons-material";
import universityLogo from "../../assets/university-logo.jpg";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  useDeleteBannerMutation,
  useDeleteCourseMutation,
  useUploadBannerMutation,
} from "../../services/courses.service";
import { useEffect, useState } from "react";
import { useFilePicker } from "use-file-picker";

const CourseItem = ({ course }: { course: Course }) => {
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

  const { openFilePicker } = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: false,
    onFilesSuccessfullySelected: (files) => {
      setBanner(files.plainFiles[0]);
    },
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
  };

  return (
    <Card square={false} elevation={5}>
      <Stack>
        <Stack direction="row" sx={{ p: 2 }}>
          <Avatar
            sx={{ height: 80, width: 80 }}
            src={course.university.logo || universityLogo}
          />

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

          <Button onClick={() => openFilePicker()}>Upload Banner</Button>

          <Button onClick={handleDeleteBanner} color="error">
            Remove Banner
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
