import { Course, Exercise, NewUser, User } from "../types";
import { api } from "./api.service";

export const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query<User, number>({
      query: (id) => ({
        url: `users/${id}`,
      }),
    }),
    getUserCourses: builder.query<Course[], number>({
      query: (id) => ({
        url: `users/${id}/courses`,
      }),
      providesTags: ["CourseUsers"],
    }),
    getUserSolutions: builder.query<Exercise[], number>({
      query: (id) => ({
        url: `users/${id}/solutions`,
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
  }),
});

export const {
  useGetUserByIdQuery,
  useGetUserCoursesQuery,
  useGetUserSolutionsQuery,
  useSignUpMutation,
} = usersApi;
