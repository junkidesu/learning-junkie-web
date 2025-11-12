import { Course, Enrollment, Exercise, Progress, User } from "../types";
import { api } from "./api.service";

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query<User, number>({
      query: (id) => ({
        url: `users/${id}`,
      }),
      providesTags: ["User"],
    }),
    getUserEnrollments: builder.query<Enrollment[], number>({
      query: (id) => ({
        url: `users/${id}/enrollments`,
      }),
      providesTags: ["Enrollment", "Progress"],
    }),
    getTaughtCourses: builder.query<Course[], number>({
      query: (id) => ({
        url: `users/${id}/courses`,
      }),
    }),
    getUserSolutions: builder.query<Exercise[], number>({
      query: (id) => ({
        url: `users/${id}/solutions`,
      }),
      providesTags: ["Progress", "Submission"],
    }),
    getUserProgress: builder.query<Progress[], number>({
      query: (id) => ({
        url: `users/${id}/progress`,
      }),
      providesTags: ["Progress", "Submission", "Enrollment"],
    }),
    uploadAvatar: builder.mutation<User, { id: number; body: FormData }>({
      query: ({ id, body }) => ({
        url: `users/${id}/avatar`,
        method: "POST",
        formData: true,
        body,
      }),
      invalidatesTags: ["User"],
    }),
    deleteAvatar: builder.mutation<User, number>({
      query: (id) => ({
        url: `users/${id}/avatar`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useGetUserEnrollmentsQuery,
  useGetTaughtCoursesQuery,
  useGetUserSolutionsQuery,
  useGetUserProgressQuery,
  useUploadAvatarMutation,
  useDeleteAvatarMutation,
} = usersApi;
