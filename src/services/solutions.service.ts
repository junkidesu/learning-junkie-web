import { ExerciseCheckResponse, Solution } from "../types";
import { api } from "./api.service";

export const solutionsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getQuestionSolution: builder.query<Solution, number>({
      query: (id) => ({
        url: `questions/${id}/solution`,
      }),
    }),
    postQuestionSolution: builder.mutation<
      ExerciseCheckResponse,
      { id: number; body: Solution }
    >({
      query: ({ id, body }) => ({
        url: `questions/${id}/solution`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["UserSolutions"],
    }),
    getEssaySolution: builder.query<Solution, number>({
      query: (id) => ({
        url: `essays/${id}/solution`,
      }),
    }),
    postEssaySolution: builder.mutation<
      ExerciseCheckResponse,
      { id: number; body: Solution }
    >({
      query: ({ id, body }) => ({
        url: `essays/${id}/solution`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["UserSolutions"],
    }),
    getQuizSolution: builder.query<Solution, number>({
      query: (id) => ({
        url: `quizzes/${id}/solution`,
      }),
    }),
    postQuizSolution: builder.mutation<
      ExerciseCheckResponse,
      { id: number; body: Solution }
    >({
      query: ({ id, body }) => ({
        url: `quizzes/${id}/solution`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["UserSolutions"],
    }),
  }),
});

export const {
  useGetQuestionSolutionQuery,
  usePostQuestionSolutionMutation,
  useGetEssaySolutionQuery,
  usePostEssaySolutionMutation,
  useGetQuizSolutionQuery,
  usePostQuizSolutionMutation,
} = solutionsApi;
