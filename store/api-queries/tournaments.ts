import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery';

import { GAME_STATUS } from '../../types';
import { GET_GAMES, GET_LIVE_SCORES, PICKS } from '../endpoints';

const tournamentApi = createApi({
  reducerPath: 'tournamentApi',
  baseQuery,
  endpoints: builder => ({
    getGames: builder.query<any, { status: GAME_STATUS }>({
      query: ({ status }: { status: GAME_STATUS }) =>
        status === 'STATUS_IN_PROGRESS' ? GET_LIVE_SCORES : GET_GAMES(status),
    }),
    createPick: builder.mutation({
      query: body => ({ url: PICKS, method: 'POST', body }),
    }),
  }),
});

export const { useGetGamesQuery, useCreatePickMutation } = tournamentApi;

export default tournamentApi;
