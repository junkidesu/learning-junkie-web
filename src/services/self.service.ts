import { LessonCompletion, Progress, Submission, User } from "../types";
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
    getSelfSubmissions: builder.query<Submission[], void>({
      query: () => ({
        url: "users/self/submissions",
      }),
    }),
    getSelfSuccessfulSubmissions: builder.query<Submission[], void>({
      query: () => ({
        url: "users/self/submissions/successful",
      }),
    }),
    uploadAvatar: builder.mutation<User, { body: FormData }>({
      query: ({ body }) => ({
        url: `users/self/avatar`,
        method: "POST",
        formData: true,
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetSelfProgressQuery,
  useGetSelfLessonCompletionsQuery,
  useGetSelfSubmissionsQuery,
  useGetSelfSuccessfulSubmissionsQuery,
  useUploadAvatarMutation,
} = selfApi;
