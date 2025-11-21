import {
  Button,
  Divider,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Submission, SubmissionState } from "../../../../types";
import ExerciseItem from "./ExerciseItem";
import React, { useState } from "react";
import CustomNumberField from "../../../../components/custom/CustomNumberField";
import { useGradeSubmissionMutation } from "../../../../services/submissions.service";
import useAlert from "../../../../hooks/useAlert";

const SubmissionItem = ({ submission }: { submission: Submission }) => {
  const [grade, setGrade] = useState(0);
  const [state, setState] = useState<SubmissionState>(
    SubmissionState.PartialSuccess
  );
  const [comment, setComment] = useState("");

  const [gradeSubmission] = useGradeSubmissionMutation();

  const { showAlert } = useAlert();

  const handleChange = (e: SelectChangeEvent<typeof state>) => {
    setState(e.target.value as SubmissionState);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      grade,
      state,
      comment,
    };

    try {
      await gradeSubmission({ id: submission.id, body }).unwrap();

      console.log("Success!");

      showAlert({
        message: `Successfully graded submission ${submission.id}`,
        severity: "success",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Stack gap={2}>
        <ExerciseItem exercise={submission.exercise} />

        {submission.content.tag === "Essay" && (
          <React.Fragment>
            <Typography>
              <b>User submitted content: </b>
              {submission.content.essayAnswer}
            </Typography>
          </React.Fragment>
        )}

        <Divider />

        <Stack
          component="form"
          onSubmit={handleSubmit}
          alignItems="stretch"
          gap={2}
        >
          <CustomNumberField label="Grade" value={grade} setValue={setGrade} />

          <FormControl fullWidth required>
            <InputLabel id="demo-simple-select-label">
              Submission State
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={state}
              label="Submission State"
              onChange={handleChange}
              required
            >
              <MenuItem value={SubmissionState.Failure}>Failure</MenuItem>
              <MenuItem value={SubmissionState.PartialSuccess}>
                Partial Success
              </MenuItem>
              <MenuItem value={SubmissionState.Success}>Success</MenuItem>
            </Select>
            <FormHelperText>
              Please select the final state of the submission
            </FormHelperText>
          </FormControl>

          <TextField
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            label="Comment (Optional)"
            helperText="Please leave a comment to the submission"
          />

          <Button type="submit" variant="contained">
            Grade
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default SubmissionItem;
