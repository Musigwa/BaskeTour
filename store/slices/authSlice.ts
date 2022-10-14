import { createSlice } from "@reduxjs/toolkit";

import { fetchUsers } from "../api-thunks/auth-thunks";

export interface IAuthState {
  token: string;
  user: any;
  userList: any[];
  pushToken: string;
  loading: boolean;
  error: string;
}

const initialState: IAuthState = {
  token: "",
  user: null,
  pushToken: "",
  loading: false,
  userList: [],
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loggedOut: () => initialState,
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
  },
});

export const { loggedOut } = authSlice.actions;

export default authSlice.reducer;
