import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { Quiz } from "../../../types";

const QuizItem = ({ quiz }: { quiz: Quiz }) => {
  return (
    <Paper sx={{ p: 2 }} elevation={5}>
      <Stack gap={1}>
        <Stack direction="row">
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {quiz.title}
          </Typography>
          <Typography>Grade: {quiz.grade}</Typography>
        </Stack>

        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            {quiz.question}
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="A"
              control={<Radio />}
              label={quiz.options.A}
              disabled
            />
            <FormControlLabel
              value="B"
              control={<Radio />}
              label={quiz.options.B}
              disabled
            />
            <FormControlLabel
              value="C"
              control={<Radio />}
              label={quiz.options.C}
              disabled
            />
            <FormControlLabel
              value="D"
              control={<Radio />}
              label={quiz.options.D}
              disabled
            />
          </RadioGroup>
        </FormControl>

        <Divider />

        <Stack direction="row">
          <Button color="error">Delete</Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default QuizItem;
