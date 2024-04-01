import { University } from "../types";
import { api } from "./api";

export const universitiesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUniversities: builder.query<University[], void>({
      query: () => ({
        url: "universities",
      }),
    }),
  }),
});

export const { useGetUniversitiesQuery } = universitiesApi;
