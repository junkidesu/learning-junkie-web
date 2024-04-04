import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;

      if (token) headers.append("authorization", `Bearer ${token}`);

      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["Course", "User", "CourseUsers", "UserSolutions", "University"],
});
