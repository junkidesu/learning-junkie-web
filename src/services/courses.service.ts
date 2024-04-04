import { Course, NewCourse, User } from "../types";
import { api } from "./api.service";

export const coursesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addCourse: builder.mutation<Course, { id: number; body: NewCourse }>({
      query: ({ id, body }) => ({
        url: `universities/${id}/courses`,
        method: "POST",
        body,
      }),
    }),
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
      providesTags: ["CourseUsers"],
    }),
    enroll: builder.mutation<void, number>({
      query: (id) => ({
        url: `courses/${id}/enrollments`,
        method: "POST",
      }),
      invalidatesTags: ["CourseUsers"],
    }),
  }),
});

export const {
  useAddCourseMutation,
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useGetEnrolledUsersQuery,
  useEnrollMutation,
} = coursesApi;
