import {
  Course,
  EditUniversity,
  NewUniversity,
  NewUser,
  University,
  User,
} from "../types";
import { api } from "./api.service";

export const universitiesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addUniversity: builder.mutation<University, NewUniversity>({
      query: (body) => ({
        url: `universities`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["University"],
    }),
    getUniversities: builder.query<University[], void>({
      query: () => ({
        url: "universities",
      }),
      providesTags: ["University"],
    }),
    getUniversityById: builder.query<University, number>({
      query: (id) => ({
        url: `universities/${id}`,
      }),
      providesTags: ["University"],
    }),
    getUniversityCourses: builder.query<Course[], number>({
      query: (id) => ({
        url: `universities/${id}/courses`,
      }),
      providesTags: ["University", "Course"],
    }),
    getUniversityRepresentatives: builder.query<User[], number>({
      query: (id) => ({
        url: `universities/${id}/representatives`,
      }),
      providesTags: ["University", "User"],
    }),
    getUniversityInsturctors: builder.query<User[], number>({
      query: (id) => ({
        url: `universities/${id}/instructors`,
      }),
      providesTags: ["University", "User"],
    }),
    uploadLogo: builder.mutation<University, { id: number; body: FormData }>({
      query: ({ id, body }) => ({
        url: `universities/${id}/logo`,
        method: "POST",
        formData: true,
        body,
      }),
      invalidatesTags: ["University"],
    }),
    deleteLogo: builder.mutation<University, number>({
      query: (id) => ({
        url: `universities/${id}/logo`,
        method: "DELETE",
      }),
    }),
    deleteUniversity: builder.mutation<void, number>({
      query: (id) => ({
        url: `universities/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["University"],
    }),
    editUniversity: builder.mutation<
      University,
      { id: number; body: EditUniversity }
    >({
      query: ({ id, body }) => ({
        url: `universities/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["University"],
    }),
    addRepresentative: builder.mutation<User, { id: number; body: NewUser }>({
      query: ({ id, body }) => ({
        url: `universities/${id}/representatives`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["University", "User"],
    }),
    addInstructor: builder.mutation<User, { id: number; body: NewUser }>({
      query: ({ id, body }) => ({
        url: `universities/${id}/instructors`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["University", "User"],
    }),
  }),
});

export const {
  useAddUniversityMutation,
  useGetUniversitiesQuery,
  useGetUniversityByIdQuery,
  useGetUniversityCoursesQuery,
  useGetUniversityRepresentativesQuery,
  useGetUniversityInsturctorsQuery,
  useUploadLogoMutation,
  useDeleteLogoMutation,
  useDeleteUniversityMutation,
  useEditUniversityMutation,
  useAddRepresentativeMutation,
  useAddInstructorMutation,
} = universitiesApi;
