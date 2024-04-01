import {
  Container,
  Stack,

} from "@mui/material";
import { useGetUniversitiesQuery } from "../services/universities.service";
import UniversityCard from "../components/UniversityCard";

const AllUniversitiesPage = () => {
  const { data: universities } = useGetUniversitiesQuery();

  return (
    <Container>
      <Stack sx={{ gap: 3 }}>
        {universities?.map((u) => (
          <UniversityCard key={u.id} university={u} />
        ))}
      </Stack>
    </Container>
  );
};

export default AllUniversitiesPage;
