import { Course, EditCourse, Enrollment, NewCourse } from "../types";
import { api } from "./api.service";

export const coursesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addCourse: builder.mutation<Course, { id: number; body: NewCourse }>({
      query: ({ id, body }) => ({
        url: `universities/${id}/courses`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Course"],
    }),
    getCourses: builder.query<Course[], void>({
      query: () => ({
        url: "courses",
      }),
      providesTags: ["Course"],
    }),
    getCourseById: builder.query<Course, number>({
      query: (id) => ({
        url: `courses/${id}`,
      }),
      providesTags: ["Course"],
    }),
    getEnrolledUsers: builder.query<Enrollment[], number>({
      query: (id) => ({
        url: `courses/${id}/enrollments`,
      }),
      providesTags: ["CourseUsers"],
    }),
    editCourse: builder.mutation<Course, { id: number; body: EditCourse }>({
      query: ({ id, body }) => ({
        url: `courses/${id}`,
        method: "PUT",
        body,
      }),
    }),
    deleteCourse: builder.mutation<void, number>({
      query: (id) => ({
        url: `courses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),
    enroll: builder.mutation<void, number>({
      query: (id) => ({
        url: `courses/${id}/enrollments`,
        method: "POST",
      }),
      invalidatesTags: ["CourseUsers"],
    }),
    uploadBanner: builder.mutation<Course, { id: number; body: FormData }>({
      query: ({ id, body }) => ({
        url: `courses/${id}/banner`,
        method: "POST",
        formData: true,
        body,
      }),
    }),
    deleteBanner: builder.mutation<void, number>({
      query: (id) => ({
        url: `courses/${id}/banner`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddCourseMutation,
  useGetCoursesQuery,
  useGetCourseByIdQuery,
  useGetEnrolledUsersQuery,
  useDeleteCourseMutation,
  useEditCourseMutation,
  useEnrollMutation,
  useUploadBannerMutation,
  useDeleteBannerMutation,
} = coursesApi;
