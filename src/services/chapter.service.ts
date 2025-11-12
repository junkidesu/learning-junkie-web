import { Chapter, NewChapter } from "../types";
import { api } from "./api.service";

export const chaptersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getChaptersByCourseId: builder.query<Chapter[], number>({
      query: (id) => ({
        url: `courses/${id}/chapters`,
      }),
      providesTags: ["Chapter"],
    }),
    getChapterByNumber: builder.query<
      Chapter,
      { id: number; chapterNumber: number }
    >({
      query: ({ id, chapterNumber }) => ({
        url: `courses/${id}/chapters/${chapterNumber}`,
      }),
      providesTags: ["Chapter"],
    }),
    addChapter: builder.mutation<Chapter, { id: number; body: NewChapter }>({
      query: ({ id, body }) => ({
        url: `courses/${id}/chapters`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Chapter"],
    }),
    deleteChapter: builder.mutation<
      void,
      { id: number; chapterNumber: number }
    >({
      query: ({ id, chapterNumber }) => ({
        url: `courses/${id}/chapters/${chapterNumber}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Chapter"],
    }),
  }),
});

export const {
  useGetChaptersByCourseIdQuery,
  useGetChapterByNumberQuery,
  useAddChapterMutation,
  useDeleteChapterMutation,
} = chaptersApi;
