import { Button, Container, Stack, Typography } from "@mui/material";
import { useGetUniversitiesQuery } from "../../../services/universities.service";
import UniversityItem from "./UniversityItem";
import { AddHomeTwoTone } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ManageUniversities = () => {
  const { data: universities, isLoading, isError } = useGetUniversitiesQuery();

  const navigate = useNavigate();

  if (isLoading) return <Typography>Loading...</Typography>;

  if (!universities || isError)
    return <Typography>Some error has occurred!</Typography>;

  return (
    <Stack gap={2}>
      {universities.map((u) => (
        <UniversityItem key={u.id} university={u} />
      ))}

      <Container sx={{ width: "100%" }}>
        <Button
          variant="contained"
          sx={{ float: "right" }}
          startIcon={<AddHomeTwoTone />}
          onClick={() => navigate(`/universities/new`)}
        >
          Add University
        </Button>
      </Container>
    </Stack>
  );
};

export default ManageUniversities;
