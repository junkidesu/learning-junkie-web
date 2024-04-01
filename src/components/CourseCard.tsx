import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardActionArea,
} from "@mui/material";
import { Course } from "../types";
import courseBanner from "../assets/course-banner.jpg";
import { Link, useNavigate } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";
import { useEnrollMutation } from "../services/courses.service";

const CourseCard = ({ course }: { course: Course }) => {
  const { existsId, courses } = useAuthUser();

  const isEnrolled = courses?.map((c) => c.id).includes(course.id);

  const navigate = useNavigate();

  const [enroll] = useEnrollMutation();

  const handleEnroll = async () => {
    await enroll(course.id);
  };

  return (
    <Card sx={{ maxWidth: "345px", height: "100%" }}>
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
        {existsId &&
          (isEnrolled ? (
            <Button>Continue</Button>
          ) : (
            <Button onClick={handleEnroll}>Enroll</Button>
          ))}
        <Link to={`/courses/${course.id}`}>
          <Button>Learn More</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default CourseCard;
