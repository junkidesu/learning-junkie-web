import {
  Course,
  Enrollment,
  Exercise,
  NewUser,
  Progress,
  User,
} from "../types";
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
      providesTags: ["CourseUsers"],
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
      providesTags: ["UserSolutions"],
    }),
    getUserProgress: builder.query<Progress[], number>({
      query: (id) => ({
        url: `users/${id}/progress`,
      }),
      providesTags: ["UserSolutions"],
    }),
    signUp: builder.mutation<User, NewUser>({
      query: (newUser) => ({
        url: `users`,
        body: newUser,
        method: "POST",
      }),
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
    }),
  }),
});

export const {
  useGetUserByIdQuery,
  useGetUserEnrollmentsQuery,
  useGetTaughtCoursesQuery,
  useGetUserSolutionsQuery,
  useGetUserProgressQuery,
  useSignUpMutation,
  useUploadAvatarMutation,
  useDeleteAvatarMutation,
} = usersApi;
