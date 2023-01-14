import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';
import {
  GET_GROUPS,
  GROUPS,
  GROUP_RANKING,
  JOIN_GROUP,
  GET_USER_GROUPS,
  MY_GROUPS,
} from '../endpoints';

type MyGroupProps = {
  searchQuery: string;
  userId: string;
  page: number;
  perPage: number;
};

export const groupApi = createApi({
  reducerPath: 'groupApi',
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    createGroup: builder.mutation({
      query: (payload) => ({ url: GROUPS, method: 'POST', body: payload }),
    }),
    getGroups: builder.query<any, MyGroupProps>({
      query: ({ searchQuery, userId, page, perPage }: MyGroupProps) =>
        GET_GROUPS(searchQuery, userId, page, perPage),
    }),
    getUserGroups: builder.query<any, void>({
      query: () => GET_USER_GROUPS(),
    }),
    getMyGroups: builder.query<any, MyGroupProps>({
      query: ({ searchQuery, userId, page, perPage }: MyGroupProps) =>
        MY_GROUPS(searchQuery, userId, page, perPage),
    }),
    joinGroup: builder.mutation<any, { groupId: string; groupPIN: string }>({
      query: (payload) => ({
        url: JOIN_GROUP(payload.groupId),
        method: 'POST',
        body: { groupPIN: payload.groupPIN },
      }),
    }),
    getGRankings: builder.query<any, { groupId: string; roundId?: string }>({
      query: ({ groupId, roundId }) => GROUP_RANKING(groupId, roundId),
    }),
  }),
});

export const {
  useGetGroupsQuery,
  useGetGRankingsQuery,
  useJoinGroupMutation,
  useCreateGroupMutation,
  useGetMyGroupsQuery,
  useGetUserGroupsQuery,
} = groupApi;
