import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

import { authApi } from "./api-queries/auth-queries";
import { groupApi } from "./api-queries/group-queries";
import tournamentApi from "./api-queries/tournaments";
import authReducer from "./slices/authSlice";
import groupReducer from "./slices/groupSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage: AsyncStorage,
  blacklist: [authApi.reducerPath],
};

const rootReducer = combineReducers({
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
  groups: groupReducer,
  [groupApi.reducerPath]: groupApi.reducer,
  [tournamentApi.reducerPath]: tournamentApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(authApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
