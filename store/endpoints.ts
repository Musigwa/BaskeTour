import { GAME_STATUS } from '../types';

export const TODOS = 'https://jsonplaceholder.typicode.com/todos';
// Users endpoints

export const SIGN_UP = '/users/sign-up';
export const LOGIN = 'users/login';
export const CURRENT_USER = '/users/me';
export const FORGOT_PASSWORD = '/users/recover-password';
export const RESET_PASSWORD = '/users/reset-password';

// Groups endpoints
export const GROUPS = '/groups';
export const SINGLE_GROUP = groupId => `${GROUPS}/${groupId}`;
export const GET_GROUPS = (groupName = '', page, perPage) =>
  `${GROUPS}?searchQuery=${groupName}&page=${page}&perPage=${perPage}`;
export const MY_GROUPS = (groupName = '', page, perPage) =>
  `${GROUPS}?searchQuery=${groupName}&page=${page}&perPage=${perPage}`;
export const GET_USER_GROUPS = (searchQuery = '') =>
  `${GROUPS}/user-groups?searchQuery=${searchQuery}`;
export const GROUP_RANKING = (groupId, roundId) =>
  `${SINGLE_GROUP(groupId)}/leader-board?roundId=${roundId}`;
export const JOIN_GROUP = (groupId: string) => `${SINGLE_GROUP(groupId)}/join-group`;
export const DELETE_GROUP = (groupId: string) => `${GROUPS}/${groupId}`;
export const DELETE_GROUP_PLAYER = (groupId: string) => `${SINGLE_GROUP(groupId)}/remove-player`;

// Games endpoints
export const TOURNAMENTS = `/tournaments`;
export const GET_MY_SCORES = (roundId: string, status: GAME_STATUS) => {
  return `${TOURNAMENTS}/rounds/${roundId}/my-scores?gameStatus=${status}`;
};
export const GET_ALL_SCORES = (roundId: string, status: GAME_STATUS) => {
  return `${TOURNAMENTS}/rounds/${roundId}/games?gameStatus=${status}`;
};
export const PICKS = '/picks';
export const MY_PICKS = (tournamentId, roundId, groupId) =>
  `${PICKS}/my-picks?tournamentId=${tournamentId}&roundId=${roundId}&groupId=${groupId}`;
