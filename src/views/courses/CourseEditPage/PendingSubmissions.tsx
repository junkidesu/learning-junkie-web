import { Stack, Typography } from "@mui/material";
import { useGetPendingSubmissionsQuery } from "../../../services/courses.service";
import { Course } from "../../../types";
import SubmissionItem from "./SubmissionItem";

const PendingSubmissions = ({ course }: { course: Course }) => {
  const {
    data: submissions,
    isLoading,
    isError,
  } = useGetPendingSubmissionsQuery(course.id);

  if (isLoading) return <Typography>Loading submissions...</Typography>;

  if (isError || !submissions)
    return <Typography>Some error has occurred!</Typography>;

  return (
    <Stack>
      {submissions.length === 0 ? (
        <Typography>No pending submissions so far!</Typography>
      ) : (
        submissions.map((submission) => (
          <SubmissionItem key={submission.id} submission={submission} />
        ))
      )}
    </Stack>
  );
};

export default PendingSubmissions;
