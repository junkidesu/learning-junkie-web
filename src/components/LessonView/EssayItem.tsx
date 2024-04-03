import {
  Card,
  Stack,
  Typography,
  TextField,
  Container,
  Button,
} from "@mui/material";
import { Essay } from "../../types";

const EssayItem = ({ essay }: { essay: Essay }) => {
  return (
    <Card variant="elevation" elevation={5}>
      <Stack gap={2} sx={{ p: 2 }}>
        <Stack direction="row">
          <Typography fontWeight="bold" fontStyle="italic" sx={{ flexGrow: 1 }}>
            {essay.title || "Essay"}
          </Typography>

          <Typography fontWeight="bold">
            {essay.grade === 1 ? "1 point" : `${essay.grade} points`}
          </Typography>
        </Stack>

        <Typography>{essay.task}</Typography>

        <TextField
          label="Answer"
          variant="filled"
          fullWidth
          required
          multiline
          minRows={4}
        />

        <Container sx={{ width: "100%" }}>
          <Button sx={{ float: "right" }} variant="contained">
            Submit
          </Button>
        </Container>
      </Stack>
    </Card>
  );
};

export default EssayItem;
