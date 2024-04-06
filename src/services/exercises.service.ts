import {
  EditEssay,
  EditQuestion,
  EditQuiz,
  Essay,
  Question,
  Quiz,
} from "../types";
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
    editEssay: builder.mutation<Essay, { id: number; body: EditEssay }>({
      query: ({ id, body }) => ({
        url: `essays/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Exercise"],
    }),
    editQuiz: builder.mutation<Quiz, { id: number; body: EditQuiz }>({
      query: ({ id, body }) => ({
        url: `quizzes/${id}`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useEditQuestionMutation,
  useEditEssayMutation,
  useEditQuizMutation,
} = exercisesApi;
