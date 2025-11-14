import { Box, Button, Stack, TextField } from "@mui/material";
import MDEditor from "@uiw/react-md-editor";
import React, { SetStateAction, useState } from "react";
import { useAddLessonMutation } from "../../../services/lessons.service";
import { Chapter, NewLesson } from "../../../types";

const NewLessonForm = ({
  lastLessonNumber,
  chapter,
  setActiveStep,
  setNewLessonId,
}: {
  lastLessonNumber: number;
  chapter: Chapter;
  setActiveStep: React.Dispatch<SetStateAction<number>>;
  setNewLessonId: React.Dispatch<SetStateAction<number | undefined>>;
}) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [content, setContent] = useState<string | undefined>("");

  const [addLesson] = useAddLessonMutation();

  const handleSubmit = async () => {
    const body: NewLesson = {
      title,
      description,
      number: lastLessonNumber + 1,
      components: [{ tag: "Markdown", content: content! }],
    };

    try {
      const newLesson = await addLesson({
        id: chapter.course.id,
        chapterNumber: chapter.number,
        body,
      }).unwrap();

      console.log("Success!");

      setNewLessonId(newLesson.id);
      setActiveStep(1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <Stack
        component="form"
        sx={{ display: "flex", alignItems: "center", gap: 2 }}
      >
        <TextField
          label="Title"
          helperText="Please enter the title of the chapter"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          fullWidth
        />
        <TextField
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          label="Description"
          helperText="Please enter the description of the chapter"
          required
        />

        <MDEditor
          value={content}
          onChange={setContent}
          style={{ width: "100%" }}
        />
      </Stack>

      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <Button sx={{ mr: 1, width: "fit-content" }} onClick={handleSubmit}>
          Next
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default NewLessonForm;
