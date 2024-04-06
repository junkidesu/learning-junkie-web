import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  Stack,
  TextField,
} from "@mui/material";
import { Lesson } from "../../../types";
import { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { useEditLessonMutation } from "../../../services/lessons.service";

const EditInformationAndContent = ({ lesson }: { lesson: Lesson }) => {
  const [description, setDescription] = useState(lesson.description);
  const [content, setContent] = useState(lesson.content);

  const [editLesson] = useEditLessonMutation();

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(description, content);

    try {
      await editLesson({
        id: lesson.course.id,
        number: lesson.number,
        body: {
          description,
          content,
        },
      });

      console.log("Success!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Stack
      component="form"
      gap={4}
      sx={{
        p: 3,
        alignItems: "center",
      }}
      onSubmit={handleUpdate}
    >
      <TextField
        variant="outlined"
        label="Description"
        required
        fullWidth
        multiline
        minRows={3}
        helperText="Please enter the description of the lesson"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <FormControl required fullWidth>
        <MDEditor value={content} onChange={(val) => setContent(val!)} />
        <FormHelperText>
          Please enter the markdown content of the lesson
        </FormHelperText>
      </FormControl>

      <Container>
        <Button variant="contained" sx={{ float: "right" }} type="submit">
          Update
        </Button>
      </Container>
    </Stack>
  );
};

export default EditInformationAndContent;
