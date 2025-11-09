import { Chapter } from "../types";
import { api } from "./api.service";

export const chaptersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getChaptersByCourseId: builder.query<Chapter[], number>({
      query: (id) => ({
        url: `courses/${id}/chapters`,
      }),
    }),
  }),
});

export const {
    useGetChaptersByCourseIdQuery
} = chaptersApi