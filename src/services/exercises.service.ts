import { EditQuestion, Question } from "../types";
import { api } from "./api.service";

export const exercisesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    editQuestion: builder.mutation<
      Question,
      { id: number; body: EditQuestion }
    >({
      query: ({ id, body }) => ({
        url: `questions/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Exercise"],
    }),
  }),
});

export const { useEditQuestionMutation } = exercisesApi;
