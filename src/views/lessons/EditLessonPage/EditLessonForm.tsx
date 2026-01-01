import { useState } from "react";
import { EditLesson, Lesson } from "../../../types";
import { Button, Stack, TextField } from "@mui/material";
import MDEditor from "@uiw/react-md-editor";
import { useEditLessonMutation } from "../../../services/lessons.service";
import useAlert from "../../../hooks/useAlert";
import katex from "katex";
import { getCodeString } from "rehype-rewrite";
import "katex/dist/katex.css";

const EditLessonForm = ({ lesson }: { lesson: Lesson }) => {
  const { showAlert } = useAlert();

  const [title, setTitle] = useState<string>(lesson.title);
  const [description, setDescription] = useState<string>(lesson.description);
  const [content, setContent] = useState(
    lesson.components.filter((c) => c.tag === "Markdown")[0].content
  );

  const [editLesson] = useEditLessonMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body: EditLesson = {
      title,
      description,
      components: [
        {
          tag: "Markdown",
          content,
        },
      ],
    };

    try {
      await editLesson({ id: lesson.id, body }).unwrap();

      console.log("Success!");

      showAlert({
        message: "Successfully edited lesson!",
        severity: "success",
      });
    } catch (error) {
      console.error(error);
      showAlert({ message: "Could not edit lesson :(", severity: "error" });
    }
  };

  return (
    <Stack component="form" gap={2} alignItems="end" onSubmit={handleSubmit}>
      <TextField
        label="Title"
        helperText="Please enter the title of the lesson"
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />

      <TextField
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        label="Description"
        helperText="Please enter the description of the lesson"
        fullWidth
      />

      <MDEditor
        value={content}
        onChange={(e) => setContent(e!)}
        style={{ width: "100%" }}
        previewOptions={{
          components: {
            //@ts-expect-error issue with inline KaTex
            code: ({ inline, children = [], className, ...props }) => {
              //@ts-expect-error issue with inline KaTeX
              const txt = children[0] || "";
              if (inline) {
                if (typeof txt === "string" && /^\$\$(.*)\$\$/.test(txt)) {
                  const html = katex.renderToString(
                    txt.replace(/^\$\$(.*)\$\$/, "$1"),
                    {
                      throwOnError: false,
                    }
                  );
                  return <code dangerouslySetInnerHTML={{ __html: html }} />;
                }
                return <code>{txt}</code>;
              }
              const code =
                props.node && props.node.children
                  ? getCodeString(props.node.children)
                  : txt;
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
              return <code className={String(className)}>{txt}</code>;
            },
          },
        }}
      />

      <Button type="submit" variant="contained">
        Update
      </Button>
    </Stack>
  );
};

export default EditLessonForm;
