import { NewSubmission, Submission } from "../types";
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
  }),
});

export const { useAddSubmissionMutation } = submissionsApi;
