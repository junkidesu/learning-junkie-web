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

const CourseCard = ({ course }: { course: Course }) => {
  return (
    <Card sx={{ maxWidth: "345px", height: "100%" }}>
      <CardActionArea>
        <CardMedia component="img" height={200} image={courseBanner} />
      </CardActionArea>

      <CardContent>
        <Typography variant="h5">{course.title}</Typography>
        <Typography variant="body2" textOverflow="ellipsis" sx={{ overflow: "hidden", textWrap: "nowrap" }}>{course.description}</Typography>
      </CardContent>

      <CardActions>
        <Button>Enroll</Button>
        <Button>Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default CourseCard;
