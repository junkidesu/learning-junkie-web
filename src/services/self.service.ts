import { Progress } from "../types";
import { api } from "./api.service";

export const selfApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSelfProgress: builder.query<Progress[], number>({
      query: () => ({
        url: "users/self/progress"
      }),
    }),
  }),
});

export const {
    useGetSelfProgressQuery
} = selfApi;