import { AuthResponse, Credentials, NewUser, User } from "../types";
import { api } from "./api.service";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, Credentials>({
      query: (credentials) => ({
        url: "users/login",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<User, NewUser>({
      query: (newUser) => ({
        url: "users/register",
        method: "POST",
        body: newUser,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
