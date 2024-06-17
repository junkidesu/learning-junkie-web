import { Avatar, Skeleton } from "@mui/material";

const LoadingUserAvatar = () => (
  <Avatar>
    <Skeleton variant="circular" width="100%" height="100%" />
  </Avatar>
);

export default LoadingUserAvatar;
