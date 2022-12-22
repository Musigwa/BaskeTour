import { createSlice } from '@reduxjs/toolkit';

import { authApi } from '../api-queries/auth-queries';

export interface IAuthState {
  token: string;
  user: any;
  userList: any[];
  pushToken: string;
  loading: boolean;
  error: string;
  completedOnboarding: boolean;
  isLoggedIn: boolean;
}

const initialState: IAuthState = {
  token: '',
  user: null,
  pushToken: '',
  loading: false,
  userList: [],
  error: '',
  completedOnboarding: false,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    loggedOut: () => initialState,
    completedOnboarding: (state, action) => {
      state.completedOnboarding = action.payload;
    },
    hasLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(authApi.endpoints.signup.matchFulfilled, (state, { payload }) => {
      state.user = payload.data;
      state.token = payload.token;
    });

    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
      state.user = payload.data;
      state.token = payload.token;
    });

    builder.addMatcher(
      authApi.endpoints.uploadProfileDetails.matchFulfilled,
      (state, { payload }) => {
        state.user = payload.data;
      }
    );
  },
});

export const { loggedOut, completedOnboarding, hasLoggedIn } = authSlice.actions;

export default authSlice.reducer;
