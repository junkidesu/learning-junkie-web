import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Skeleton,
} from "@mui/material";

const LoadingCourseCard = () => {
  return (
    <Card sx={{ maxWidth: "345px", height: "100%" }}>
      <CardActionArea>
        <Skeleton variant="rectangular" height={200} />
      </CardActionArea>

      <CardContent>
        <Skeleton variant="text" sx={{ fontSize: "2rem" }} />
      </CardContent>

      <CardActions>
        {/* <Button>Enroll</Button> */}
        <Button>Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default LoadingCourseCard;
