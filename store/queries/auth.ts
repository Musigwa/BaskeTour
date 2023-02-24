import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './';

import {
  CHANGE_PASSWORD,
  CURRENT_USER,
  FORGOT_PASSWORD,
  LOGIN,
  RESET_PASSWORD,
  SIGN_UP,
} from '../endpoints';

export const authApi = createApi({
  reducerPath: 'authApi',
  keepUnusedDataFor: 1,
  refetchOnMountOrArgChange: 1,
  baseQuery: baseQuery,
  endpoints: builder => ({
    signup: builder.mutation({
      query: body => ({ url: SIGN_UP, method: 'POST', body }),
    }),
    login: builder.mutation({
      query: body => ({ url: LOGIN, method: 'POST', body }),
    }),
    getMyProfile: builder.query<any, unknown>({
      query: () => ({ url: CURRENT_USER, method: 'GET' }),
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
    updatePassword: builder.mutation<any, { newPassword: string; password: string }>({
      query: body => ({ url: CHANGE_PASSWORD, method: 'PUT', body }),
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
  useSignupMutation,
  useUploadProfileDetailsMutation,
  useLoginMutation,
  useDeleteAccountMutation,
  useForgotPassordMutation,
  useResetPassordMutation,
  useUpdatePasswordMutation,
  useGetMyProfileQuery,
} = authApi;
