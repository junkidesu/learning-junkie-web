import { Stack, Typography } from "@mui/material";
import useAuthUser from "../../hooks/useAuthUser";
import ProgressItem from "./ProgessItem";

const ProgressList = () => {
  const {
    existsId,
    authUser,
    progress,
    userLoading,
    progressLoading,
    progressError,
  } = useAuthUser();

  if (!existsId) return null;

  if (progressLoading || userLoading)
    return <Typography>Loading...</Typography>;

  if (progressError || !progress || !authUser)
    return <Typography>Something went terribly wrong :(</Typography>;

  if (progress.length === 0)
    return (
      <Typography>
        Nothing to show. This user is not enrolled in any course.
      </Typography>
    );
  return (
    <Stack gap={1}>
      {progress.map((p) => (
        <ProgressItem key={p.course.id} progress={p} user={authUser} />
      ))}
    </Stack>
  );
};

export default ProgressList;
