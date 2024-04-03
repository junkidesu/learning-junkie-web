import { Essay, Lesson, Question, Quiz } from "../types";
import { api } from "./api.service";

export const lessonsApi = api.injectEndpoints({
  endpoints: (builder) => ({
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
  useGetCourseLessonsQuery,
  useGetLessonQuestionsQuery,
  useGetLessonEssaysQuery,
  useGetLessonQuizzesQuery,
} = lessonsApi;
