import { createSlice } from '@reduxjs/toolkit';
import { IGroup, IJoinGroup } from './../../interfaces/index';

import { groupApi } from '../api-queries/group-queries';

export interface IGroupState {
  groups: Array<IGroup>;
  loading: boolean;
  error: unknown | Error;
  newGroup: IGroup;
  rankings: any[];
  joinGroup: {
    data: IJoinGroup | null;
    loading: boolean;
    error: unknown | Error;
  };
}

const initialState: IGroupState = {
  groups: [],
  loading: false,
  error: null,
  newGroup: {} as IGroup,
  rankings: [],
  joinGroup: {
    data: null,
    loading: false,
    error: null,
  },
};

const groupSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addMatcher(groupApi.endpoints.getGroups.matchFulfilled, (state, { payload }) => {
      state.groups = payload.data;
    });

    builder.addMatcher(groupApi.endpoints.joinGroup.matchFulfilled, (state, { payload }) => {
      state.joinGroup.data = payload.data;
      state.joinGroup.error = payload.error;
    });

    builder.addMatcher(groupApi.endpoints.createGroup.matchFulfilled, (state, { payload }) => {
      state.newGroup = payload.data;
    });

    builder.addMatcher(groupApi.endpoints.getGRankings.matchFulfilled, (state, { payload }) => {
      state.rankings = payload.data;
    });
  },
});

export default groupSlice.reducer;
