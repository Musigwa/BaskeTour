import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';

import { CURRENT_USER, FORGOT_PASSWORD, LOGIN, RESET_PASSWORD, SIGN_UP, TODOS } from '../endpoints';

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
    forgotPassord: builder.mutation<any, { email: string }>({
      query: body => ({ url: FORGOT_PASSWORD, method: 'POST', body }),
    }),
    resetPassord: builder.mutation<
      any,
      { email: string; verificationCode: string; password: string }
    >({
      query: body => ({ url: RESET_PASSWORD, method: 'POST', body }),
    }),
    deleteAccount: builder.mutation({
      query: () => ({ url: CURRENT_USER, method: 'DELETE' }),
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
  useDeleteAccountMutation,
  useForgotPassordMutation,
  useResetPassordMutation,
} = authApi;
