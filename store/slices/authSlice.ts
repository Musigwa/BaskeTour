import { createSlice } from "@reduxjs/toolkit";

import { authApi } from "../api-queries/auth-queries";
import { fetchUsers } from "../api-thunks/auth-thunks";

export interface IAuthState {
  token: string;
  user: any;
  userList: any[];
  pushToken: string;
  loading: boolean;
  error: string;
  completedOnboarding: boolean;
}

const initialState: IAuthState = {
  token: "",
  user: null,
  pushToken: "",
  loading: false,
  userList: [],
  error: "",
  completedOnboarding: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loggedOut: () => initialState,
    completedOnboarding: (state, action) => {
      state.completedOnboarding = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      //   state.userList = action.payload;
      console.log("payload", action.payload);
      state.loading = false;
    });

    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    builder.addMatcher(
      authApi.endpoints.signup.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.data;
        state.token = payload.token;
      }
    );

    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.data;
        state.token = payload.token;
      }
    );

    builder.addMatcher(
      authApi.endpoints.uploadProfileDetails.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.data;
      }
    );
  },
});

export const { loggedOut, completedOnboarding } = authSlice.actions;

export default authSlice.reducer;
