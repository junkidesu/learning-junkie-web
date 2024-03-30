import { Course, User } from "../types";
import { api } from "./api";

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
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useGetEnrolledUsersQuery,
} = coursesApi;
