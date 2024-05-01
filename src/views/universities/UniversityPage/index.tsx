import {
  Container,
  Typography,
  Stack,
  Paper,
  Avatar,
  Divider,
  Link,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { defaultUniversityLogo } from "../../../assets";
import { useGetUniversityByIdQuery } from "../../../services/universities.service";
import UniversityTabs from "./UniversityTabs";

const UniversityPage = () => {
  const universityId = useParams().id;

  const {
    data: university,
    isLoading,
    isError,
  } = useGetUniversityByIdQuery(Number(universityId), {
    skip: !universityId,
  });

  if (!universityId) return null;

  if (isLoading && !university) return <Typography>Loading...</Typography>;

  if (!university || isError)
    return <Typography>Some error occurred</Typography>;

  return (
    <Container>
      <Stack gap={3}>
        <Paper sx={{ p: 2 }}>
          <Stack sx={{ gap: 2 }}>
            <Stack
              direction={{ md: "row", xs: "column" }}
              sx={{ alignItems: "center" }}
              gap={3}
            >
              <Avatar
                sx={{ width: 150, height: 150 }}
                src={university.logo || defaultUniversityLogo}
              />
              <Stack
                height="100%"
                sx={{ alignItems: { xs: "center", md: "initial" } }}
              >
                <Typography variant="h5">{university.name}</Typography>
                <Typography>{university.year}</Typography>
                <Link component="a" href={university.url}>
                  {university.url}
                </Link>
              </Stack>
            </Stack>

            <Divider />

            <Typography>
              {university.abbreviation || university.name} has been a member of
              Learning Junkie since{" "}
              {new Date(university.joined).toLocaleDateString()}
            </Typography>
          </Stack>
        </Paper>

        <UniversityTabs university={university} />
      </Stack>
    </Container>
  );
};

export default UniversityPage;
