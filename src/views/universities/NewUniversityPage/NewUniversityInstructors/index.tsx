import { Divider, Stack, Typography } from "@mui/material";
import { useGetUniversityInsturctorsQuery } from "../../../../services/universities.service";
import AddInstructorForm from "./AddInstructorForm";
import UserItem from "../../../../components/users/UserItem";
import React from "react";

const NewUniversityInstructors = ({
  universityId,
}: {
  universityId?: number;
}) => {
  const {
    data: instructors,
    isLoading,
    isError,
  } = useGetUniversityInsturctorsQuery(Number(universityId), {
    skip: !universityId,
  });

  if (!universityId) return null;

  if (isLoading) return <Typography>Loading representatives...</Typography>;

  if (isError || !instructors)
    return <Typography>Some error has occurred!</Typography>;

  return (
    <Stack gap={2}>
      <AddInstructorForm universityId={universityId} />

      <Divider />

      {instructors.length === 0 ? (
        <Typography>No instructors registered yet!</Typography>
      ) : (
        <React.Fragment>
          <Typography variant="h6">Existing University Instructors</Typography>

          {instructors.map((rep) => (
            <UserItem key={rep.id} user={rep} />
          ))}
        </React.Fragment>
      )}
    </Stack>
  );
};

export default NewUniversityInstructors;
