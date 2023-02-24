import { configureStore } from '@reduxjs/toolkit';
import { AnyAction, combineReducers, Reducer } from 'redux';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

import { actions } from '../types/api';
import authReducer from './slices/auth';
import groupReducer from './slices/group';
import tournamentReducer from './slices/tournament';

import storage from '@react-native-async-storage/async-storage';
import { authApi } from './queries/auth';
import { groupApi } from './queries/group';
import { tournamentApi } from './queries/tournament';

const whitelist = ['auth'];
const persistConfig = { key: 'root', storage, whitelist };
const authPersistConfig = { key: 'auth', storage: storage, whitelist: ['token'] };

const appReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  [authApi.reducerPath]: authApi.reducer,
  groups: groupReducer,
  [groupApi.reducerPath]: groupApi.reducer,
  tournament: tournamentReducer,
  [tournamentApi.reducerPath]: tournamentApi.reducer,
});

const rootReducer: Reducer = (state: RootState, action: AnyAction) => {
  if (action.type === actions.LOGOUT) state = {} as RootState;
  return appReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([authApi.middleware, tournamentApi.middleware, groupApi.middleware]),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof appReducer>;
export type RootState = ReturnType<typeof rootReducer>;
// export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
