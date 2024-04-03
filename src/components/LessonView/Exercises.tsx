import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { Lesson } from "../../types";
import Essays from "./Essays";
import Questions from "./Questions";
import Quizzes from "./Quizzes";

const Exercises = ({ lesson }: { lesson: Lesson }) => {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Questions
        </AccordionSummary>
        <AccordionDetails>
          <Questions lesson={lesson} />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          Essays
        </AccordionSummary>
        <AccordionDetails>
          <Essays lesson={lesson} />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel3-content"
          id="panel3-header"
        >
          Quizzes
        </AccordionSummary>
        <AccordionDetails>
          <Quizzes lesson={lesson} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default Exercises;
