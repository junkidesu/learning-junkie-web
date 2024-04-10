import {
  Card,
  Stack,
  CardActionArea,
  Container,
  Divider,
  Button,
  Skeleton,
} from "@mui/material";

const LoadingUniversityCard = () => {
  return (
    <Card square={false}>
      <Stack>
        <CardActionArea sx={{ p: 2 }}>
          <Stack direction="row" gap={2}>
            <Skeleton variant="circular" sx={{ height: 80, width: 80 }} />

            <Stack sx={{ flexGrow: 1 }}>
              <Skeleton
                variant="text"
                height={40}
                sx={{ maxWidth: "500px", width: "100%" }}
              />
              <Skeleton
                variant="text"
                height={24}
                sx={{ maxWidth: "450px", width: "100%" }}
              />
              <Skeleton
                variant="text"
                height={24}
                sx={{ maxWidth: "450px", width: "100%" }}
              />
              <Skeleton
                variant="text"
                height={24}
                sx={{ maxWidth: "450px", width: "100%" }}
              />
            </Stack>
          </Stack>
        </CardActionArea>

        <Divider />

        <Container sx={{ p: 1 }}>
          <Button sx={{ float: "right" }}>Learn more</Button>
        </Container>
      </Stack>
    </Card>
  );
};

export default LoadingUniversityCard;
