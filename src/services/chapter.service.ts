import { Chapter } from "../types";
import { api } from "./api.service";

export const chaptersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getChaptersByCourseId: builder.query<Chapter[], number>({
      query: (id) => ({
        url: `courses/${id}/chapters`,
      }),
    }),
    deleteChapter: builder.mutation<
      void,
      { id: number; chapterNumber: number }
    >({
      query: ({ id, chapterNumber }) => ({
        url: `courses/${id}/chapters/${chapterNumber}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetChaptersByCourseIdQuery, useDeleteChapterMutation } =
  chaptersApi;
