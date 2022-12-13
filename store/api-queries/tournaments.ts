import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';

import { GAME_STATUS } from '../../types';
import { GET_GAMES, GET_LIVE_SCORES, PICKS, TOURNAMENTS } from '../endpoints';

const tournamentApi = createApi({
  reducerPath: 'tournament',
  baseQuery,
  endpoints: builder => ({
    getTournaments: builder.query<any, void>({
      query: () => TOURNAMENTS,
      transformResponse: (response: any) => response.data,
    }),
    getGames: builder.query<any, { status: GAME_STATUS; myScores?: boolean }>({
      query: ({ status, myScores }: { status: GAME_STATUS; myScores?: boolean }) =>
        status === 'STATUS_IN_PROGRESS' ? GET_LIVE_SCORES(myScores) : GET_GAMES(status),
    }),
    createPick: builder.mutation({
      query: body => ({ url: PICKS, method: 'POST', body }),
    }),
  }),
});

export const { useGetGamesQuery, useGetTournamentsQuery, useCreatePickMutation } = tournamentApi;

export default tournamentApi;
