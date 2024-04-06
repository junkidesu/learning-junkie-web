import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
} from "@mui/material";
import { Lesson } from "../../../types";
import { ExpandMore } from "@mui/icons-material";
import EditQuestions from "./EditQuestions";
import EditEssays from "./EditEssays";

const EditExercises = ({ lesson }: { lesson: Lesson }) => {
  return (
    <Stack width="100%">
      <Accordion elevation={5}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Questions
        </AccordionSummary>
        <AccordionDetails>
          <EditQuestions lesson={lesson} />
        </AccordionDetails>
      </Accordion>
      <Accordion elevation={5}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          Essays
        </AccordionSummary>
        <AccordionDetails>
          <EditEssays lesson={lesson} />
        </AccordionDetails>
      </Accordion>
      <Accordion elevation={5}>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          Quizzes
        </AccordionSummary>
        <AccordionDetails>Quizzes</AccordionDetails>
      </Accordion>
    </Stack>
  );
};

export default EditExercises;
