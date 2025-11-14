import { Divider, Stack, Typography } from "@mui/material";
import { useGetUniversityRepresentativesQuery } from "../../../../services/universities.service";
import AddRepresentativeForm from "./AddRepresentativeForm";
import UserItem from "../../../../components/users/UserItem";
import React from "react";

const NewUniversityRepresentatives = ({
  universityId,
}: {
  universityId?: number;
}) => {
  const {
    data: representatives,
    isLoading,
    isError,
  } = useGetUniversityRepresentativesQuery(Number(universityId), {
    skip: !universityId,
  });

  if (!universityId) return null;

  if (isLoading) return <Typography>Loading representatives...</Typography>;

  if (isError || !representatives)
    return <Typography>Some error has occurred!</Typography>;

  return (
    <Stack gap={2}>
      <AddRepresentativeForm universityId={universityId} />

      <Divider />

      {representatives.length === 0 ? (
        <Typography>No representatives registered yet!</Typography>
      ) : (
        <React.Fragment>
          <Typography variant="h6">
            Existing University Representatives
          </Typography>

          {representatives.map((rep) => (
            <UserItem key={rep.id} user={rep} />
          ))}
        </React.Fragment>
      )}
    </Stack>
  );
};

export default NewUniversityRepresentatives;
