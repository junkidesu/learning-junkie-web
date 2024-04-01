import { Course, User } from "../types";
import { api } from "./api.service";

export const coursesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query<Course[], void>({
      query: () => ({
        url: "courses",
      }),
    }),
    getCourseById: builder.query<Course, number>({
      query: (id) => ({
        url: `courses/${id}`,
      }),
    }),
    getEnrolledUsers: builder.query<User[], number>({
      query: (id) => ({
        url: `courses/${id}/enrollments`,
      }),
    }),
    enroll: builder.mutation<void, number>({
      query: (id) => ({
        url: `courses/${id}/enrollments`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useGetEnrolledUsersQuery,
  useEnrollMutation,
} = coursesApi;
