import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

import { TODOS } from "../enpoints";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getTodos: builder.query<any, void>({
      query: () => TODOS,
    }),
  }),
});

export const { useGetTodosQuery } = authApi;
