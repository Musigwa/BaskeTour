import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';

import { GET_GROUPS, GROUPS, GROUP_RANKING, JOIN_GROUP } from '../endpoints';

export const groupApi = createApi({
  reducerPath: 'groupApi',
  baseQuery: baseQuery,
  endpoints: builder => ({
    createGroup: builder.mutation({
      query: payload => ({
        url: GROUPS,
        method: 'POST',
        body: payload,
      }),
    }),
    getGroups: builder.query<any, { searchQuery: string }>({
      query: (payload: { searchQuery: string }) => GET_GROUPS(payload.searchQuery),
    }),
    joinGroup: builder.mutation<any, { groupId: string; groupPIN: string }>({
      query: payload => ({
        url: JOIN_GROUP(payload.groupId),
        method: 'POST',
        body: { groupPIN: payload.groupPIN },
      }),
    }),
    getGRankings: builder.query<any, { groupId: string; tourRoundId: string }>({
      query: ({ groupId, tourRoundId }) => GROUP_RANKING(groupId, tourRoundId),
    }),
  }),
});

export const {
  useGetGroupsQuery,
  useGetGRankingsQuery,
  useJoinGroupMutation,
  useCreateGroupMutation,
} = groupApi;
