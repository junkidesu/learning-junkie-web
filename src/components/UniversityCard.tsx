import {
  Card,
  CardActionArea,
  Stack,
  Link,
  Avatar,
  Container,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { University } from "../types";
import universityLogo from "../assets/university-logo.jpg";

const UniversityCard = ({ university }: { university: University }) => {
  const navigate = useNavigate();

  return (
    <Card square={false}>
      <Stack>
        <CardActionArea
          sx={{ p: 2 }}
          onClick={() => navigate(`/universities/${university.id}`)}
        >
          <Stack direction="row">
            <Avatar
              sx={{ height: 80, width: 80, mr: 2 }}
              src={university.logo || universityLogo}
            />

            <Stack>
              <Typography
                sx={{ textDecoration: "none" }}
                variant="h5"
                color="inherit"
              >
                {university.name}
              </Typography>
              <Typography>Founded in {university.year}</Typography>
              <Typography>
                Member since {new Date(university.joined).toLocaleDateString()}
              </Typography>
              <Link component="a" href={university.url}>
                {university.url}
              </Link>
            </Stack>
          </Stack>
        </CardActionArea>

        <Divider />

        <Container sx={{ p: 1 }}>
          <Button
            sx={{ float: "right" }}
            onClick={() => navigate(`/universities/${university.id}`)}
          >
            Learn more
          </Button>
        </Container>
      </Stack>
    </Card>
  );
};

export default UniversityCard;
