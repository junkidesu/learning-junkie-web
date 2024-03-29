import { Avatar, Card, Typography } from "@mui/material";
import { User } from "../types";

const UserItem = ({ user } : { user: User}) => {
    return <Card>
        <Avatar>{user.name.substring(0, 1)}</Avatar>

        <Typography>{user.name}</Typography>
    </Card>
}

export default UserItem;