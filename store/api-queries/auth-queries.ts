import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';

import { CURRENT_USER, LOGIN, SIGN_UP, TODOS } from '../endpoints';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQuery,
  endpoints: builder => ({
    getTodos: builder.query<any, void>({
      query: () => TODOS,
    }),
    signup: builder.mutation({
      query: body => ({ url: SIGN_UP, method: 'POST', body }),
    }),
    login: builder.mutation({
      query: body => ({ url: LOGIN, method: 'POST', body }),
    }),
    uploadProfileDetails: builder.mutation({
      query: body => ({ url: CURRENT_USER, method: 'PUT', body }),
    }),
  }),
});

export const {
  useGetTodosQuery,
  useSignupMutation,
  useUploadProfileDetailsMutation,
  useLoginMutation,
} = authApi;
