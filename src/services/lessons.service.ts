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
      invalidatesTags: ["Lesson", "Chapter"],
    }),
    getChapterLessons: builder.query<
      Lesson[],
      { id: number; chapterNumber: number }
    >({
      query: ({ id, chapterNumber }) => ({
        url: `courses/${id}/chapters/${chapterNumber}/lessons`,
      }),
      providesTags: ["Chapter", "Lesson"],
    }),
    getLessonById: builder.query<Lesson, number>({
      query: (id) => ({
        url: `lessons/${id}`,
      }),
      providesTags: ["Lesson"],
    }),
    deleteLesson: builder.mutation<void, number>({
      query: (id) => ({
        url: `lessons/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Lesson", "Chapter"],
    }),
    editLesson: builder.mutation<Lesson, { id: number; body: EditLesson }>({
      query: ({ id, body }) => ({
        url: `lessons/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Lesson", "Chapter"],
    }),
    addLessonCompletion: builder.mutation<LessonCompletion, number>({
      query: (id) => ({
        url: `lessons/${id}/completions`,
        method: "POST",
      }),
      invalidatesTags: ["Lesson", "Progress"],
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
