import {
  Stack,
  Typography,
} from "@mui/material";
import useAuthUser from "../hooks/useAuthUser";
import ProgressItem from "./ProgessItem";

const ProgressList = () => {
  const { existsId, progress, progressLoading, progressError } = useAuthUser();

  if (!existsId) return null;

  if (progressLoading) return <Typography>Loading...</Typography>;

  if (progressError || !progress)
    return <Typography>Something went terribly wrong :(</Typography>;

  return (
    <Stack gap={1}>
      {progress.map((p) => (
        <ProgressItem key={p.course.id} progress={p} />
      ))}
    </Stack>
  );
};

export default ProgressList;
