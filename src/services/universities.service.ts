import { Course, University } from "../types";
import { api } from "./api.service";

export const universitiesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUniversities: builder.query<University[], void>({
      query: () => ({
        url: "universities",
      }),
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
  }),
});

export const {
  useGetUniversitiesQuery,
  useGetUniversityByIdQuery,
  useGetUniversityCoursesQuery,
} = universitiesApi;
