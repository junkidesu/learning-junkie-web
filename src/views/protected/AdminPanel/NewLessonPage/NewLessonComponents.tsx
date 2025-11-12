import { Container } from "@mui/material";
import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";

const NewLessonComponents = () => {
  const [content, setContent] = useState<string>("");

  return (
    <Container>
      <MDEditor value={content} onChange={(e) => setContent(e!)} />
    </Container>
  );
};

export default NewLessonComponents;
