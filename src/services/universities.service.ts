import { Course, NewUniversity, University, User } from "../types";
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
      providesTags: ["University"],
    }),
    getUniversityInsturctors: builder.query<User[], number>({
      query: (id) => ({
        url: `universities/${id}/instructors`,
      }),
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
  }),
});

export const {
  useAddUniversityMutation,
  useGetUniversitiesQuery,
  useGetUniversityByIdQuery,
  useGetUniversityCoursesQuery,
  useGetUniversityInsturctorsQuery,
  useUploadLogoMutation,
  useDeleteLogoMutation,
  useDeleteUniversityMutation,
} = universitiesApi;
