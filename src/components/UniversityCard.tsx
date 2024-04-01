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
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { University } from "../types";
import universityLogo from "../assets/university-logo.jpg";

const UniversityCard = ({ university }: { university: University }) => {
  const navigate = useNavigate();

  return (
    <Card square={false}>
      <CardActionArea sx={{ p: 2 }}>
        <Stack gap={2}>
          <Stack direction="row">
            <Avatar
              sx={{ height: 80, width: 80, mr: 2 }}
              src={university.logo || universityLogo}
            />

            <Container>
              <Typography
                component={RouterLink}
                sx={{ textDecoration: "none" }}
                variant="h5"
                to={`/universities/${university.id}`}
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
            </Container>
          </Stack>

          <Divider />

          <Container>
            <Button
              sx={{ float: "right" }}
              onClick={() => navigate(`universities/${university.id}`)}
            >
              Learn more
            </Button>
          </Container>
        </Stack>
      </CardActionArea>
    </Card>
  );
};

export default UniversityCard;
