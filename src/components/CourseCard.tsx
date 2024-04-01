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

const CourseCard = ({ course }: { course: Course }) => {
  const navigate = useNavigate();

  return (
    <Card sx={{ maxWidth: "345px", height: "100%" }}>
      <CardActionArea onClick={() => navigate(`/courses/${course.id}`)}>
        <CardMedia component="img" height={200} image={course.banner || courseBanner} />
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
        <Button>Enroll</Button>
        <Link to={`/courses/${course.id}`}>
          <Button>Learn More</Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default CourseCard;
