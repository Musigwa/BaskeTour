import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./baseQuery";

import { GAME_STATUS } from "../../types";
import { GET_GAMES, GROUPS } from "../endpoints";

const tournamentApi = createApi({
  reducerPath: "tournament",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getGames: builder.query<any, { status: GAME_STATUS }>({
      query: ({ status, ...payload }: { status: GAME_STATUS }) =>
        GET_GAMES(status),
    }),
    createPick: builder.mutation({
      query: (body) => ({ url: GROUPS, method: "POST", body }),
    }),
  }),
});

export const { useGetGamesQuery, useCreatePickMutation } = tournamentApi;

export default tournamentApi;
