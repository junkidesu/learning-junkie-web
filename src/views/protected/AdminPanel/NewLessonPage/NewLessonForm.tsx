import { Button, Stack, TextField } from "@mui/material";
import MDEditor from "@uiw/react-md-editor";
import React, { useState } from "react";
import { useAddLessonMutation } from "../../../../services/lessons.service";
import { Chapter, NewLesson } from "../../../../types";
import { useNavigate } from "react-router-dom";

const NewLessonForm = ({
  lastLessonNumber,
  chapter,
}: {
  lastLessonNumber: number;
  chapter: Chapter;
}) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [content, setContent] = useState<string | undefined>("");

  const navigate = useNavigate();

  const [addLesson] = useAddLessonMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body: NewLesson = {
      title,
      description,
      number: lastLessonNumber + 1,
      components: [{ tag: "Markdown", content: content! }],
    };

    try {
      await addLesson({
        id: chapter.course.id,
        chapterNumber: chapter.number,
        body,
      }).unwrap();

      console.log("Success!");

      navigate(`/courses/${chapter.course.id}/edit`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Stack
      component="form"
      sx={{ display: "flex", alignItems: "center", gap: 2 }}
      onSubmit={handleSubmit}
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

      <Button type="submit" variant="contained">
        Submit
      </Button>
    </Stack>
  );
};

export default NewLessonForm;
