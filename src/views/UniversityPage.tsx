import { Container, Typography } from "@mui/material";
import { useParams } from "react-router-dom";

const UniversityPage = () => {
  const universityId = useParams().id;

  if (!universityId) return null;

  return (
    <Container>
      <Typography>University page</Typography>
    </Container>
  );
};

export default UniversityPage;
