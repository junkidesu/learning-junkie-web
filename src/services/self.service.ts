import {
  CourseCompletion,
  LessonCompletion,
  Progress,
  Submission,
  User,
} from "../types";
import { api } from "./api.service";

export const selfApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSelfProgress: builder.query<Progress[], void>({
      query: () => ({
        url: "users/self/progress",
      }),
      providesTags: ["Progress"],
    }),
    getSelfLessonCompletions: builder.query<LessonCompletion[], void>({
      query: () => ({
        url: `users/self/lesson-completions`,
      }),
      providesTags: ["Progress"],
    }),
    getSelfSubmissions: builder.query<Submission[], void>({
      query: () => ({
        url: "users/self/submissions",
      }),
      providesTags: ["Progress", "Submission"],
    }),
    getSelfSuccessfulSubmissions: builder.query<Submission[], void>({
      query: () => ({
        url: "users/self/submissions/successful",
      }),
      providesTags: ["Progress", "Submission"],
    }),
    getSelfCourseCompletions: builder.query<CourseCompletion[], void>({
      query: () => ({
        url: "users/self/completions",
      }),
      providesTags: ["Progress", "CourseCompletion"],
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
  useGetSelfCourseCompletionsQuery,
  useUploadAvatarMutation,
} = selfApi;
