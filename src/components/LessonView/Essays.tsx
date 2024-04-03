import { Stack, Typography } from "@mui/material";
import { Lesson } from "../../types";
import { useGetLessonEssaysQuery } from "../../services/lessons.service";
import EssayItem from "./EssayItem";

const Essays = ({ lesson }: { lesson: Lesson }) => {
  const {
    data: essays,
    isLoading,
    isError,
  } = useGetLessonEssaysQuery({
    id: lesson.course.id,
    number: lesson.number,
  });

  if (isLoading) return <Typography>Loading ...</Typography>;

  if (!essays || isError)
    return <Typography>Some error has occurred!</Typography>;

  return (
    <Stack gap={2}>
      {essays.map((e) => (
        <EssayItem essay={e} key={e.id} />
      ))}
    </Stack>
  );
};

export default Essays;
