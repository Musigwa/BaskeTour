import { createSlice } from '@reduxjs/toolkit';
import { IGroup, IJoinGroup } from './../../interfaces/index';

import { groupApi } from '../api-queries/group-queries';

export interface IGroupState {
  groups: Array<IGroup>;
  myGroups: Array<IGroup>;
  userGroups: Array<IGroup>;
  loading: boolean;
  error: unknown | Error;
  newGroup: IGroup;
  rankings: any[];
  selectedGroup: IGroup;
  joinGroup: {
    data: IJoinGroup | null;
    loading: boolean;
    error: unknown | Error;
  };
}

const initialState: IGroupState = {
  groups: [],
  myGroups: [],
  userGroups: [],
  loading: false,
  error: null,
  newGroup: {} as IGroup,
  selectedGroup: {} as IGroup,
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
  reducers: {
    selectGroup: (state, { payload }: { payload: IGroup } & any) => {
      state.selectedGroup = payload;
    },
    updateMyGroups: (state, { group }: { group: IGroup } & any) => {
      const existsId = state.myGroups.findIndex(g => g.id === group.id);
      if (existsId !== -1) state.myGroups = [...state.myGroups, group];
    },
  },
  extraReducers: builder => {
    builder.addMatcher(groupApi.endpoints.getGroups.matchFulfilled, (state, { payload }) => {
      const { page } = payload.meta;
      if (page === 1) state.groups = payload.data;
      else state.groups = [...state.groups, ...payload.data];
    });

    builder.addMatcher(groupApi.endpoints.getMyGroups.matchFulfilled, (state, { payload }) => {
      if (payload.data.length) state.selectedGroup = payload.data[0];
      const { page } = payload.meta;
      if (page === 1) state.myGroups = payload.data;
      else state.myGroups = [...state.myGroups, ...payload.data];
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

    builder.addMatcher(groupApi.endpoints.getSingleGroup.matchFulfilled, (state, { payload }) => {
      const exists = state.myGroups.find(g => g.id === payload.data.id);
      if (!exists) state.myGroups = [...state.myGroups, payload.data];
      else state.myGroups = [...state.myGroups, { ...exists, ...payload.data }];
    });

    builder.addMatcher(groupApi.endpoints.removeGroup.matchFulfilled, (state, { meta }) => {
      const { originalArgs } = meta.arg;
      const existsId = state.myGroups.findIndex(g => g.id === originalArgs.groupId);
      if (existsId !== -1)
        state.myGroups = [...state.myGroups.filter(g => g.id !== originalArgs.groupId)];
    });

    builder.addMatcher(groupApi.endpoints.removeGroupPlayer.matchFulfilled, (state, { meta }) => {
      const { originalArgs } = meta.arg;
      const group = state.myGroups.find(g => g.id === originalArgs.groupId);
      if (!group) return;
      const index = group.players?.findIndex(p => p.id === originalArgs.playerId);
      if (index !== -1) group.players?.splice(index, 1);
      state.myGroups = [group, ...state.myGroups.filter(g => g.id !== group.id)];
    });

    builder.addMatcher(
      groupApi.endpoints.updateGroup.matchFulfilled,
      (state, { payload, meta }) => {
        const { originalArgs } = meta.arg;
        const groups = state.myGroups.filter(g => g.id !== originalArgs.groupId);
        state.myGroups = [...groups, payload.data];
      }
    );
  },
});

export const { selectGroup, updateMyGroups } = groupSlice.actions;

export default groupSlice.reducer;
