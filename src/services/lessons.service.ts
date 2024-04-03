import { Lesson } from "../types";
import { api } from "./api.service";

export const lessonsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCourseLessons: builder.query<Lesson[], number>({
      query: (id) => ({
        url: `courses/${id}/lessons`,
      }),
    }),
  }),
});

export const { useGetCourseLessonsQuery } = lessonsApi;
