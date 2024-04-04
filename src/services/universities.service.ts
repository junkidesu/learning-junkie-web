import { Course, NewUniversity, University } from "../types";
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
    }),
    getUniversityCourses: builder.query<Course[], number>({
      query: (id) => ({
        url: `universities/${id}/courses`,
      }),
    }),
    deleteUniversity: builder.mutation<void, number>({
      query: (id) => ({
        url: `universities/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddUniversityMutation,
  useGetUniversitiesQuery,
  useGetUniversityByIdQuery,
  useGetUniversityCoursesQuery,
  useDeleteUniversityMutation,
} = universitiesApi;
