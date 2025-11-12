import { EditLesson, Lesson, LessonCompletion, NewLesson } from "../types";
import { api } from "./api.service";

export const lessonsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addLesson: builder.mutation<
      Lesson,
      { id: number; chapterNumber: number; body: NewLesson }
    >({
      query: ({ id, chapterNumber, body }) => ({
        url: `courses/${id}/chapters/${chapterNumber}/lessons`,
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
    deleteLesson: builder.mutation<void, number>({
      query: (id) => ({
        url: `lessons/${id}`,
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
    addLessonCompletion: builder.mutation<LessonCompletion, number>({
      query: (id) => ({
        url: `lessons/${id}/completions`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetChapterLessonsQuery,
  useGetLessonByIdQuery,
  useAddLessonMutation,
  useDeleteLessonMutation,
  useEditLessonMutation,
  useAddLessonCompletionMutation,
} = lessonsApi;
