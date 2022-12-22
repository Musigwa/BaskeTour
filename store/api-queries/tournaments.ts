import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';

import { GAME_STATUS } from '../../types';
import { GET_ALL_SCORES, GET_MY_SCORES, MY_PICKS, PICKS, TOURNAMENTS } from '../endpoints';

type GQueryParamsType = { roundId: string; status: GAME_STATUS; myScores?: boolean };
type GPicksQueryParams = { tournamentId: string; roundId: string };

const tournamentApi = createApi({
  reducerPath: 'tournament',
  baseQuery,
  endpoints: builder => ({
    getTournaments: builder.query<any, void>({
      query: () => TOURNAMENTS,
      transformResponse: (response: any) => response.data,
    }),
    getGames: builder.query<any, GQueryParamsType>({
      query: ({ roundId, status, myScores = false }: GQueryParamsType) => {
        if (myScores) return GET_MY_SCORES(roundId, status);
        return GET_ALL_SCORES(roundId, status);
      },
    }),
    createPick: builder.mutation({ query: body => ({ url: PICKS, method: 'POST', body }) }),
    getPicks: builder.query<any, GPicksQueryParams>({
      query: ({ tournamentId, roundId }: GPicksQueryParams) => MY_PICKS(tournamentId, roundId),
    }),
  }),
});

export const { useGetGamesQuery, useGetPicksQuery, useGetTournamentsQuery, useCreatePickMutation } =
  tournamentApi;

export default tournamentApi;
