import { Divider, Paper, Stack, Typography } from "@mui/material";
import { Exercise, SubmissionState } from "../../../../types";
import { HistoryEdu, QuestionMark, Quiz, Rule } from "@mui/icons-material";
import useAuthUser from "../../../../hooks/useAuthUser";
import { useGetSelfSubmissionsQuery } from "../../../../services/self.service";
import TypeAnswer from "./TypeAnswer";
import QuizAnswer from "./QuizAnswer";
import TrueFalse from "./TrueFalse";
import Essay from "./Essay";

const ExerciseItem = ({ exercise }: { exercise: Exercise }) => {
  const { authUser } = useAuthUser();

  const { data: submissions } = useGetSelfSubmissionsQuery(undefined, {
    skip: !authUser,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const userSolution = submissions
    ?.filter((submission) => submission.state === SubmissionState.Success)
    ?.find((submission) => submission.exercise.id === exercise.id);

  return (
    <Paper square={false} elevation={3} sx={{ p: 2 }}>
      <Stack gap={2}>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" gap={2} alignItems="center">
            {exercise.content.tag === "TypeAnswer" && <QuestionMark />}
            {exercise.content.tag === "Quiz" && <Quiz />}
            {exercise.content.tag === "Essay" && <HistoryEdu />}
            {exercise.content.tag === "Coding" && <Rule />}

            <Typography variant="h6">{exercise.title}</Typography>
          </Stack>

          {authUser && (
            <Typography fontWeight="bold">
              Grade: {userSolution ? userSolution.grade : 0}/{exercise.maxGrade}
            </Typography>
          )}
        </Stack>

        <Typography component="span" color="text.secondary">
          {exercise.description}
        </Typography>

        <Divider />

        {exercise.content.tag === "TypeAnswer" && (
          <TypeAnswer exercise={exercise} userSolution={userSolution} />
        )}

        {exercise.content.tag === "Quiz" && (
          <QuizAnswer exercise={exercise} userSolution={userSolution} />
        )}

        {exercise.content.tag === "TrueFalse" && (
          <TrueFalse exercise={exercise} userSolution={userSolution} />
        )}

        {exercise.content.tag === "Essay" && (
          <Essay exercise={exercise} userSolution={userSolution} />
        )}
      </Stack>
    </Paper>
  );
};

export default ExerciseItem;
