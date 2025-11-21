import {
  Course,
  CourseCompletion,
  EditCourse,
  Enrollment,
  NewCourse,
  Submission,
} from "../types";
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
      providesTags: ["Enrollment"],
    }),
    editCourse: builder.mutation<Course, { id: number; body: EditCourse }>({
      query: ({ id, body }) => ({
        url: `courses/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Course"],
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
      invalidatesTags: ["Enrollment"],
    }),
    uploadBanner: builder.mutation<Course, { id: number; body: FormData }>({
      query: ({ id, body }) => ({
        url: `courses/${id}/banner`,
        method: "POST",
        formData: true,
        body,
      }),
      invalidatesTags: ["Course"],
    }),
    deleteBanner: builder.mutation<void, number>({
      query: (id) => ({
        url: `courses/${id}/banner`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),
    completeCourse: builder.mutation<CourseCompletion, number>({
      query: (id) => ({
        url: `courses/${id}/certificate/generate`,
        method: "POST",
      }),
      invalidatesTags: ["Progress", "CourseCompletion"],
    }),
    getPendingSubmissions: builder.query<Submission[], number>({
      query: (id) => ({
        url: `courses/${id}/submissions`,
      }),
      providesTags: ["Submission"],
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
  useCompleteCourseMutation,
  useGetPendingSubmissionsQuery,
} = coursesApi;
