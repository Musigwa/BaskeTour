import { GAME_STATUS } from '../types';

export const TODOS = 'https://jsonplaceholder.typicode.com/todos';
export const SIGN_UP = '/users/sign-up';
export const LOGIN = 'users/login';
export const CURRENT_USER = '/users/me';

// Groups endpoints
export const GROUPS = '/groups';
export const SINGLE_GROUP = groupId => `${GROUPS}/${groupId}`;
export const GET_GROUPS = (groupName = '') => `${GROUPS}?searchQuery=${groupName}`;
export const GROUP_RANKING = (groupId, roundId) =>
  `${SINGLE_GROUP(groupId)}/leader-board?roundId=${roundId}`;
export const JOIN_GROUP = (groupId: string) => `${SINGLE_GROUP(groupId)}/join-group`;

// Games endpoints
export const TOURNAMENTS = `/tournaments`;
export const GET_GAMES = (roundId: string, status: GAME_STATUS) => {
  return `${TOURNAMENTS}/rounds/${roundId}/my-scores?gameStatus=${status}`;
};
export const GET_MY_SCORES = (roundId: string, status: GAME_STATUS) => {
  return `${TOURNAMENTS}/rounds/${roundId}/my-scores?gameStatus=${status}`;
};
export const GET_ALL_SCORES = (roundId: string, status: GAME_STATUS) => {
  return `${TOURNAMENTS}/rounds/${roundId}/games?gameStatus=${status}`;
};
export const GET_LIVE_SCORES = (myScores = false) => {
  return `${TOURNAMENTS}/live-scores?myScores=${myScores}`;
};

export const PICKS = '/picks';
export const MY_PICKS = (tournamentId, roundId) =>
  `${PICKS}/my-picks?roundId=${roundId}&tournamentId=${tournamentId}`;
