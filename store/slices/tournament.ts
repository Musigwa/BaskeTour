import { createSlice } from "@reduxjs/toolkit";
import { IGame, IPick } from "../../interfaces/index";
import tournamentApi from "../api-queries/tournaments";

export interface ITournamentState {
  picks: Array<IPick>;
  games: Array<IGame>;
}

const initialState: ITournamentState = { picks: [], games: [] };

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
        state.games = payload.data.data;
      }
    );
  },
});

export default tournamentSlice.reducer;
