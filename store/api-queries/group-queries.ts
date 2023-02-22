import { createApi } from '@reduxjs/toolkit/query/react';
import {
  DELETE_GROUP,
  DELETE_GROUP_PLAYER,
  GET_GROUPS,
  GROUPS,
  GROUP_RANKING,
  JOIN_GROUP,
  MY_GROUPS,
  SINGLE_GROUP,
} from '../endpoints';
import baseQuery from './baseQuery';

type MyGroupProps = {
  searchQuery?: string;
  page?: number;
  perPage?: number;
};

export const groupApi = createApi({
  reducerPath: 'groupApi',
  keepUnusedDataFor: 1,
  refetchOnMountOrArgChange: 1,
  baseQuery: baseQuery,
  endpoints: builder => ({
    createGroup: builder.mutation({
      query: payload => ({ url: GROUPS, method: 'POST', body: payload }),
    }),
    getGroups: builder.query<any, MyGroupProps>({
      query: ({ searchQuery, page, perPage }: MyGroupProps) =>
        GET_GROUPS(searchQuery, page, perPage),
    }),
    getMyGroups: builder.query<any, MyGroupProps>({
      query: ({ searchQuery, page, perPage }: MyGroupProps) =>
        MY_GROUPS(searchQuery, page, perPage),
    }),
    getSingleGroup: builder.query<any, { groupId: string }>({
      query: ({ groupId }: { groupId: string }) => SINGLE_GROUP(groupId),
    }),
    joinGroup: builder.mutation<any, { groupId: string; groupPIN: string }>({
      query: payload => ({
        url: JOIN_GROUP(payload.groupId),
        method: 'POST',
        body: { groupPIN: payload.groupPIN },
      }),
    }),
    getGRankings: builder.query<any, { groupId: string; roundId?: string }>({
      query: ({ groupId, roundId }) => GROUP_RANKING(groupId, roundId),
    }),
    removeGroup: builder.mutation<any, { groupId: string }>({
      query: ({ groupId }) => ({ url: DELETE_GROUP(groupId), method: 'DELETE' }),
    }),
    removeGroupPlayer: builder.mutation<any, { groupId: string; playerId: string }>({
      query: payload => ({
        url: DELETE_GROUP_PLAYER(payload.groupId),
        method: 'DELETE',
        body: { playerId: payload.playerId },
      }),
    }),
    updateGroup: builder.mutation<any, { groupId: string; groupName: string; groupPIN: string }>({
      query: ({ groupId, groupName, groupPIN }) => ({
        url: SINGLE_GROUP(groupId),
        method: 'PUT',
        body: { groupName, groupPIN },
      }),
    }),
  }),
});

export const {
  useGetGroupsQuery,
  useGetGRankingsQuery,
  useJoinGroupMutation,
  useCreateGroupMutation,
  useGetMyGroupsQuery,
  useGetSingleGroupQuery,
  useRemoveGroupPlayerMutation,
  useRemoveGroupMutation,
  useUpdateGroupMutation,
} = groupApi;
