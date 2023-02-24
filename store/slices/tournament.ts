import { createSlice } from '@reduxjs/toolkit';
import { IGame, IPick, IRound, ITournament } from '../../interfaces/index';
import { getActiveRound } from '../../utils/methods';
import { tournamentApi } from '../queries/tournament';

export interface ITournamentState {
  picks: Array<IPick>;
  games: Array<IGame>;
  tournaments: Array<ITournament>;
  selectedTour: ITournament;
  activeRound: IRound;
}

const initialState: ITournamentState = {
  picks: [],
  games: [],
  tournaments: [],
  selectedTour: { rounds: [] } as ITournament,
  activeRound: {} as IRound,
};

const tournamentSlice = createSlice({
  name: 'tournament',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(tournamentApi.endpoints.createPick.matchFulfilled, (state, { payload }) => {
      state.picks = payload.data;
    });
    builder.addMatcher(tournamentApi.endpoints.getGames.matchFulfilled, (state, { payload }) => {
      state.games = payload.data;
    });

    builder.addMatcher(tournamentApi.endpoints.getPicks.matchFulfilled, (state, { payload }) => {
      state.picks = payload.picks;
    });

    builder.addMatcher(
      tournamentApi.endpoints.getTournaments.matchFulfilled,
      (state, { payload }) => {
        state.tournaments = payload?.data;
        if (payload?.data?.length > 0) {
          state.selectedTour = payload?.data?.[0];
          state.activeRound = getActiveRound(payload?.data?.[0]);
        }
      }
    );
  },
});

export default tournamentSlice.reducer;
