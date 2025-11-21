import { Card, CardActionArea, Stack, Typography } from "@mui/material";
import { Enrollment, educationToString } from "../../types";
import UserAvatar from "./UserAvatar";
import { useNavigate } from "react-router-dom";

const EnrollmentItem = ({ enrollment }: { enrollment: Enrollment }) => {
  const navigate = useNavigate();

  return (
    <Card key={enrollment.user.id} elevation={3}>
      <CardActionArea
        sx={{ p: 2 }}
        onClick={() => navigate(`/users/${enrollment.user.id}`)}
      >
        <Stack direction="row" gap={2} sx={{ alignItems: "center" }}>
          <UserAvatar user={enrollment.user} />
          <Stack>
            <Typography>
              {enrollment.user.name}
              {enrollment.user.education &&
                `, ${educationToString(enrollment.user.education)}`}
            </Typography>
            <Typography color="text.secondary">
              Enrolled on {new Date(enrollment.time).toLocaleDateString()}
            </Typography>
          </Stack>
        </Stack>
      </CardActionArea>
    </Card>
  );
};

export default EnrollmentItem;
