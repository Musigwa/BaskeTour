import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import Config from '../../environment';

import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

import type { RootState } from '..';
import { actions } from '../../types/api';

export const baseUrl = Config.API_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) headers.set('x-auth-token', `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);
  if ((result.meta?.response?.status || result?.error?.status) === 401)
    api.dispatch({ type: actions.LOGOUT });
  return result;
};

export default baseQueryWithReauth;
