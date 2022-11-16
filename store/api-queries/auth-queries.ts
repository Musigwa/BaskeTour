import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';

import { LOGIN, SIGN_UP, TODOS, USERS } from '../endpoints';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQuery,
  endpoints: builder => ({
    getTodos: builder.query<any, void>({
      query: () => TODOS,
    }),
    signup: builder.mutation({
      query: details => ({
        url: SIGN_UP,
        method: 'POST',
        body: details,
      }),
    }),
    login: builder.mutation({
      query: details => ({
        url: LOGIN,
        method: 'POST',
        body: details,
      }),
    }),
    uploadProfileDetails: builder.mutation({
      query: details => ({
        url: USERS,
        method: 'PUT',
        body: details,
      }),
    }),
  }),
});

export const {
  useGetTodosQuery,
  useSignupMutation,
  useUploadProfileDetailsMutation,
  useLoginMutation,
} = authApi;
