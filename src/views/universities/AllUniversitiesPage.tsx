import { Container, Stack } from "@mui/material";
import { useGetUniversitiesQuery } from "../../services/universities.service";
import UniversityCard from "../../components/universities/UniversityCard";
import LoadingUniversityCard from "../../components/loading/LoadingUniversityCard";

const AllUniversitiesPage = () => {
  const { data: universities, isLoading } = useGetUniversitiesQuery();

  return (
    <Container>
      <Stack sx={{ gap: 3 }}>
        {isLoading && [1, 2, 3].map((i) => <LoadingUniversityCard key={i} />)}
        {universities?.map((u) => (
          <UniversityCard key={u.id} university={u} />
        ))}
      </Stack>
    </Container>
  );
};

export default AllUniversitiesPage;
