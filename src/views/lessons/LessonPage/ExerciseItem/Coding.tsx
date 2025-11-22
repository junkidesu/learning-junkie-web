import { Stack, Typography, Button, Collapse } from "@mui/material";
import {
  Environment,
  Exercise,
  Submission,
  SubmissionState,
} from "../../../../types";
import { useEffect, useState } from "react";
import useAuthUser from "../../../../hooks/useAuthUser";
import { useAddSubmissionMutation } from "../../../../services/submissions.service";
import Editor from "@monaco-editor/react";

const environmentToLanguage = (e: Environment): string => {
  if (e === Environment.Node) return "javascript";

  if (e === Environment.Python) return "python";

  return "c";
};

const Coding = ({
  exercise,
  userSolution,
}: {
  exercise: Exercise;
  userSolution?: Submission;
}) => {
  const [program, setProgram] = useState("");

  const [editorOpen, setEditorOpen] = useState(false);

  const { authUser } = useAuthUser();

  const [addSubmission] = useAddSubmissionMutation();

  useEffect(() => {
    if (userSolution && userSolution.content.tag === "Coding") {
      setProgram(userSolution.content.program);
    }
  }, [setProgram, userSolution]);

  const handleAnswerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const tag = exercise.content.tag;

    if (tag === "Coding") {
      const body = {
        content: {
          tag,
          program,
        },
      };

      try {
        console.log(body);
        await addSubmission({ id: exercise.id, body: body! }).unwrap();
        console.log("Success!");
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (exercise.content.tag !== "Coding") return null;

  const isSubmissionSuccess = userSolution?.state === SubmissionState.Success;

  return (
    <Stack
      component="form"
      gap={2}
      alignItems="start"
      onSubmit={handleAnswerSubmit}
    >
      <Typography>{exercise.content.requirements}</Typography>

      <Button variant="contained" onClick={() => setEditorOpen(!editorOpen)}>
        Open Code Editor
      </Button>

      <Collapse in={editorOpen} sx={{ width: "100%" }}>
        <Stack
          sx={{ width: "100%", height: "fit-content" }}
          border={1}
          borderRadius={1}
          borderColor="InactiveBorder"
          p={1}
          gap={1}
        >
          <Typography color="text.secondary">Write Your Solution</Typography>
          <Editor
            className="model-solution"
            height="200px"
            language={environmentToLanguage(exercise.content.environment)}
            theme="vs-dark"
            value={program}
            onChange={(e) => setProgram(e!)}
          />
        </Stack>
      </Collapse>

      <Button
        variant="contained"
        type="submit"
        disabled={!authUser || isSubmissionSuccess}
      >
        Submit
      </Button>
    </Stack>
  );
};

export default Coding;
