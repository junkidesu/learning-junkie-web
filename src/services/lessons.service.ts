import { Essay, Lesson, NewLesson, Question, Quiz } from "../types";
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
    getLessonQuestions: builder.query<
      Question[],
      { id: number; number: number }
    >({
      query: ({ id, number }) => ({
        url: `courses/${id}/lessons/${number}/questions`,
      }),
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
  useGetLessonQuestionsQuery,
  useGetLessonEssaysQuery,
  useGetLessonQuizzesQuery,
} = lessonsApi;
