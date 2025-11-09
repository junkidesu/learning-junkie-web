import { EditLesson, Lesson, NewLesson } from "../types";
import { api } from "./api.service";

export const lessonsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addLesson: builder.mutation<Lesson, { id: number; body: NewLesson }>({
      query: ({ id, body }) => ({
        url: `courses/${id}/lessons`,
        method: "POST",
        body,
      }),
    }),
    getChapterLessons: builder.query<
      Lesson[],
      { id: number; chapterNumber: number }
    >({
      query: ({ id, chapterNumber }) => ({
        url: `courses/${id}/chapters/${chapterNumber}/lessons`,
      }),
    }),
    getLessonById: builder.query<Lesson, number>({
      query: (id) => ({
        url: `lessons/${id}`,
      }),
    }),
    deleteLesson: builder.mutation<void, { id: number; number: number }>({
      query: ({ id, number }) => ({
        url: `courses/${id}/lessons/${number}`,
        method: "DELETE",
      }),
    }),
    editLesson: builder.mutation<
      Lesson,
      { id: number; number: number; body: EditLesson }
    >({
      query: ({ id, number, body }) => ({
        url: `courses/${id}/lessons/${number}`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useGetChapterLessonsQuery,
  useGetLessonByIdQuery,
  useDeleteLessonMutation,
  useEditLessonMutation,
} = lessonsApi;
