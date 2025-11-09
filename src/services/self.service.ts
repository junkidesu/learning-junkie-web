import { LessonCompletion, Progress } from "../types";
import { api } from "./api.service";

export const selfApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSelfProgress: builder.query<Progress[], void>({
      query: () => ({
        url: "users/self/progress",
      }),
    }),
    getSelfLessonCompletions: builder.query<LessonCompletion[], void>({
      query: () => ({
        url: `users/self/lesson-completions`,
      }),
    }),
  }),
});

export const { useGetSelfProgressQuery, useGetSelfLessonCompletionsQuery } =
  selfApi;
