import { createSlice } from '@reduxjs/toolkit';
import { IGame, IPick, ITournament } from '../../interfaces/index';
import tournamentApi from '../api-queries/tournaments';

export interface ITournamentState {
  picks: Array<IPick>;
  games: Array<IGame>;
  tournaments: Array<ITournament>;
  selectedTour: ITournament;
}

const initialState: ITournamentState = {
  picks: [],
  games: [],
  tournaments: [],
  selectedTour: {} as ITournament,
};

const tournamentSlice = createSlice({
  name: 'tournament',
  initialState,
  reducers: {
    selectTournament: (state, { payload }: { payload: ITournament } & any) => {
      state.selectedTour = payload;
    },
  },
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
        state.tournaments = payload.data;
      }
    );
  },
});

export const { selectTournament } = tournamentSlice.actions;

export default tournamentSlice.reducer;
