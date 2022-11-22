import { createSlice } from "@reduxjs/toolkit";
import tournamentApi from "../api-queries/tournaments";
import { IGame, IPick } from "./../../interfaces/index";

export interface ITournamentState {
  picks: Array<IPick>;
  games: Array<IGame>;
  loading: boolean;
  error: unknown | Error;
}

const initialState: ITournamentState = {
  picks: [],
  games: [],
  loading: false,
  error: null,
};

const tournamentSlice = createSlice({
  name: "tournament",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      tournamentApi.endpoints.createPick.matchFulfilled,
      (state, { payload }) => {
        state.picks = payload.data;
      }
    );
    builder.addMatcher(
      tournamentApi.endpoints.getGames.matchFulfilled,
      (state, { payload }) => {
        state.games = payload.data;
      }
    );
  },
});

export default tournamentSlice.reducer;
