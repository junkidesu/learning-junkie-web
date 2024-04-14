import { Avatar } from "@mui/material";
import { User } from "../../types";
import { nameInitials, stringToColor } from "../../util";

const UserAvatar = ({ user }: { user: User }) =>
  user.avatar ? (
    <Avatar src={user.avatar} />
  ) : (
    <Avatar sx={{ bgcolor: stringToColor(user.name) }}>
      {nameInitials(user.name)}
    </Avatar>
  );

export default UserAvatar;
