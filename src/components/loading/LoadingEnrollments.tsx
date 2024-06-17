import { Paper, Stack, AvatarGroup, Skeleton } from "@mui/material";
import LoadingUserAvatar from "./LoadingUserAvatar";

const LoadingEnrollments = () => (
  <Paper square={false} sx={{ p: 2 }}>
    <Stack direction="row" sx={{ alignItems: "center" }}>
      <AvatarGroup max={3} sx={{ mr: 1 }}>
        {[1, 2, 3].map((i) => (
          <LoadingUserAvatar key={i} />
        ))}
      </AvatarGroup>

      <Skeleton variant="text" width={300} />
    </Stack>
  </Paper>
);

export default LoadingEnrollments;
