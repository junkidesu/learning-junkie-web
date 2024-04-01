import { Course, User } from "../types";
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
    }),
  }),
});

export const { useGetUserByIdQuery, useGetUserCoursesQuery } = usersApi;
