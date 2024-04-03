import {
  Card,
  Stack,
  Typography,
  Container,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Quiz } from "../../types";
import { useState } from "react";

const QuizItem = ({ quiz }: { quiz: Quiz }) => {
  const [option, setOption] = useState<string>("A");

  const handleCheck = () => {
    console.log(option);
  };

  return (
    <Card variant="elevation" elevation={5}>
      <Stack gap={2} sx={{ p: 2 }}>
        <Stack direction="row">
          <Typography fontWeight="bold" fontStyle="italic" sx={{ flexGrow: 1 }}>
            {quiz.title || "Quiz"}
          </Typography>

          <Typography fontWeight="bold">
            {quiz.grade === 1 ? "1 point" : `${quiz.grade} points`}
          </Typography>
        </Stack>

        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            {quiz.question}
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            onChange={(e) => setOption(e.target.value)}
          >
            <FormControlLabel
              value="A"
              control={<Radio />}
              label={quiz.options.A}
            />
            <FormControlLabel
              value="B"
              control={<Radio />}
              label={quiz.options.B}
            />
            <FormControlLabel
              value="C"
              control={<Radio />}
              label={quiz.options.C}
            />
            <FormControlLabel
              value="D"
              control={<Radio />}
              label={quiz.options.D}
            />
          </RadioGroup>
        </FormControl>

        <Container sx={{ width: "100%" }}>
          <Button
            sx={{ float: "right" }}
            variant="contained"
            onClick={handleCheck}
          >
            Check
          </Button>
        </Container>
      </Stack>
    </Card>
  );
};

export default QuizItem;
