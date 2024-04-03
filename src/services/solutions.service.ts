import { ExerciseCheckResponse, Solution } from "../types";
import { api } from "./api.service";

export const solutionsApi = api.injectEndpoints({
  endpoints: (builder) => ({
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
  usePostQuestionSolutionMutation,
  usePostEssaySolutionMutation,
  usePostQuizSolutionMutation,
} = solutionsApi;
