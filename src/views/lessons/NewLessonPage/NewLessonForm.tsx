import { Box, Button, Stack, TextField } from "@mui/material";
import MDEditor from "@uiw/react-md-editor";
import React, { SetStateAction, useState } from "react";
import { useAddLessonMutation } from "../../../services/lessons.service";
import { Chapter, NewLesson } from "../../../types";
import katex from "katex";
import { getCodeString } from "rehype-rewrite";
import "katex/dist/katex.css";

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
          previewOptions={{
            components: {
              code: ({ children = [], className, ...props }) => {
                if (
                  typeof children === "string" &&
                  /^\$\$(.*)\$\$/.test(children)
                ) {
                  const html = katex.renderToString(
                    children.replace(/^\$\$(.*)\$\$/, "$1"),
                    {
                      throwOnError: false,
                    }
                  );
                  return (
                    <code
                      dangerouslySetInnerHTML={{ __html: html }}
                      style={{ background: "transparent" }}
                    />
                  );
                }
                const code =
                  props.node && props.node.children
                    ? getCodeString(props.node.children)
                    : children;
                if (
                  typeof code === "string" &&
                  typeof className === "string" &&
                  /^language-katex/.test(className.toLocaleLowerCase())
                ) {
                  const html = katex.renderToString(code, {
                    throwOnError: false,
                  });
                  return (
                    <code
                      style={{ fontSize: "150%" }}
                      dangerouslySetInnerHTML={{ __html: html }}
                    />
                  );
                }
                return <code className={String(className)}>{children}</code>;
              },
            },
          }}
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
