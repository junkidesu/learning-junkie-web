import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardActionArea,
  Snackbar,
  Alert,
} from "@mui/material";
import { Course } from "../types";
import courseBanner from "../assets/course-banner.jpg";
import { Link, useNavigate } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import { useEnrollMutation } from "../services/courses.service";
import { useState } from "react";

const CourseCard = ({ course }: { course: Course }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const { existsId, courses } = useAuthUser();

  const isEnrolled = courses?.map((c) => c.id).includes(course.id);

  const navigate = useNavigate();

  const [enroll] = useEnrollMutation();

  const handleEnroll = async () => {
    try {
      await enroll(course.id);
      setSuccess(true);
      setSnackbarOpen(true);
    } catch (error) {
      setSuccess(false);
      setSnackbarOpen(true);
      console.error(error);
    }
  };

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;

    setSnackbarOpen(false);
  };

  return (
    <Card sx={{ height: "100%", width: "100%" }}>
      <CardActionArea onClick={() => navigate(`/courses/${course.id}`)}>
        <CardMedia
          component="img"
          height={200}
          image={course.banner || courseBanner}
        />
      </CardActionArea>

      <CardContent>
        <Typography variant="h5">{course.title}</Typography>
        <Typography
          variant="body2"
          textOverflow="ellipsis"
          sx={{ overflow: "hidden", textWrap: "nowrap" }}
        >
          {course.description}
        </Typography>
      </CardContent>

      <CardActions>
        {isEnrolled ? (
          <Button onClick={() => navigate(`/courses/${course.id}/lessons`)}>
            Continue
          </Button>
        ) : (
          <Button onClick={handleEnroll} disabled={!existsId}>
            Enroll
          </Button>
        )}
        <Link to={`/courses/${course.id}`}>
          <Button>Learn More</Button>
        </Link>
      </CardActions>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={success ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {success
            ? `Successfully enrolled in course "${course.title}"!`
            : "Some error has occurred :("}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default CourseCard;
