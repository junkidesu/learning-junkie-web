import {
  Essay,
  Lesson,
  NewLesson,
  NewQuestion,
  Question,
  Quiz,
} from "../types";
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
    getCourseLessons: builder.query<Lesson[], number>({
      query: (id) => ({
        url: `courses/${id}/lessons`,
      }),
    }),
    deleteLesson: builder.mutation<void, { id: number; number: number }>({
      query: ({ id, number }) => ({
        url: `courses/${id}/lessons/${number}`,
        method: "DELETE",
      }),
    }),
    getLessonQuestions: builder.query<
      Question[],
      { id: number; number: number }
    >({
      query: ({ id, number }) => ({
        url: `courses/${id}/lessons/${number}/questions`,
      }),
      providesTags: ["Exercise"],
    }),
    addQuestion: builder.mutation<
      Question,
      { lesson: Lesson; body: NewQuestion }
    >({
      query: ({ lesson, body }) => ({
        url: `courses/${lesson.course.id}/lessons/${lesson.number}/questions`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Exercise"],
    }),
    getLessonEssays: builder.query<Essay[], { id: number; number: number }>({
      query: ({ id, number }) => ({
        url: `courses/${id}/lessons/${number}/essays`,
      }),
    }),
    getLessonQuizzes: builder.query<Quiz[], { id: number; number: number }>({
      query: ({ id, number }) => ({
        url: `courses/${id}/lessons/${number}/quizzes`,
      }),
    }),
  }),
});

export const {
  useAddLessonMutation,
  useGetCourseLessonsQuery,
  useDeleteLessonMutation,
  useGetLessonQuestionsQuery,
  useAddQuestionMutation,
  useGetLessonEssaysQuery,
  useGetLessonQuizzesQuery,
} = lessonsApi;
