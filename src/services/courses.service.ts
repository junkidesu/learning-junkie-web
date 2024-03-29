import { Course } from "../types";
import { api } from "./api";

export const coursesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query<Course[], void>({
      query: () => ({
        url: "courses",
      }),
    }),
  }),
});

export const { useGetCoursesQuery } = coursesApi;
