import { ManualGrade, NewSubmission, Submission } from "../types";
import { api } from "./api.service";

export const submissionsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addSubmission: builder.mutation<
      Submission,
      { id: number; body: NewSubmission }
    >({
      query: ({ id, body }) => ({
        url: `exercises/${id}/submissions`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Progress", "Submission"],
    }),
    gradeSubmission: builder.mutation<
      Submission,
      { id: number; body: ManualGrade }
    >({
      query: ({ id, body }) => ({
        url: `submissions/${id}/grade`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Submission", "Progress"],
    }),
  }),
});

export const { useAddSubmissionMutation } = submissionsApi;
