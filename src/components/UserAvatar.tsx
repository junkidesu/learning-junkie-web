import { Avatar } from "@mui/material";
import { User } from "../types";
import { nameInitials } from "../util";

const UserAvatar = ({ user }: { user: User }) =>
  user.avatar ? (
    <Avatar src={user.avatar} />
  ) : (
    <Avatar>{nameInitials(user.name)}</Avatar>
  );

export default UserAvatar;
