import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

import { GET_GROUPS, JOIN_GROUP } from "../enpoints";

export const groupApi = createApi({
  reducerPath: "groupApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getGroups: builder.query<any, { searchQuery: string }>({
      query: (payload: { searchQuery: string }) =>
        GET_GROUPS(payload.searchQuery),
    }),
    joinGroup: builder.mutation<any, { groupId: string; groupPIN: string }>({
      query: (payload) => ({
        url: JOIN_GROUP(payload.groupId),
        method: "POST",
        body: { groupPIN: payload.groupPIN },
      }),
    }),
  }),
});

export const { useGetGroupsQuery, useJoinGroupMutation } = groupApi;
