import { Card, CardActionArea, Stack, Typography } from "@mui/material";
import { User, educationToString } from "../../types";
import UserAvatar from "./UserAvatar";
import { useNavigate } from "react-router-dom";

const UserItem = ({ user }: { user: User }) => {
  const navigate = useNavigate();

  return (
    <Card key={user.id} elevation={3}>
      <CardActionArea
        sx={{ p: 2 }}
        onClick={() => navigate(`/users/${user.id}`)}
      >
        <Stack direction="row" gap={2} sx={{ alignItems: "center" }}>
          <UserAvatar user={user} />
          <Typography>
            {user.name}
            {user.education && `, ${educationToString(user.education)}`}
          </Typography>
        </Stack>
      </CardActionArea>
    </Card>
  );
};

export default UserItem;
