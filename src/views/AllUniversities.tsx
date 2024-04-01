import {
  Avatar,
  Button,
  Container,
  Divider,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useGetUniversitiesQuery } from "../services/universities.service";
import universityLogo from "../assets/university-logo.jpg";
import { Link as RouterLink } from "react-router-dom";

const AllUniversities = () => {
  const { data: universities } = useGetUniversitiesQuery();

  return (
    <Container>
      <Stack sx={{ gap: 3 }}>
        {universities?.map((u) => (
          <Paper sx={{ p: 2 }} square={false}>
            <Stack gap={2}>
              <Stack direction="row">
                <Avatar
                  sx={{ height: 80, width: 80, mr: 2 }}
                  src={u.logo || universityLogo}
                />

                <Container>
                  <Typography
                    component={RouterLink}
                    sx={{ textDecoration: "none" }}
                    variant="h5"
                    to={`/universities/${u.id}`}
                    color="inherit"
                  >
                    {u.name}
                  </Typography>
                  <Typography>Founded in {u.year}</Typography>
                  <Link component="a" href={u.url}>
                    {u.url}
                  </Link>
                </Container>
              </Stack>

              <Divider />

              <Container>
                <Button sx={{ float: "right" }}>
                  Learn more
                </Button>
              </Container>
            </Stack>
          </Paper>
        ))}
      </Stack>
    </Container>
  );
};

export default AllUniversities;
