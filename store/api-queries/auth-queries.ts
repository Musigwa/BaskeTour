import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

import { CURRENT_USER, LOGIN, SIGN_UP, TODOS } from "../endpoints";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getTodos: builder.query<any, void>({
      query: () => TODOS,
    }),
    getProfile: builder.query<any, void>({
      query: () => CURRENT_USER,
    }),
    signup: builder.mutation({
      query: (details) => ({ url: SIGN_UP, method: "POST", body: details }),
    }),
    login: builder.mutation({
      query: (details) => ({ url: LOGIN, method: "POST", body: details }),
    }),
    uploadProfileDetails: builder.mutation({
      query: (details) => ({ url: CURRENT_USER, method: "PUT", body: details }),
    }),
  }),
});

export const {
  useGetTodosQuery,
  useSignupMutation,
  useUploadProfileDetailsMutation,
  useLoginMutation,
  useGetProfileQuery,
} = authApi;
