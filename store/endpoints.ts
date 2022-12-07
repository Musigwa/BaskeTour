import { GAME_STATUS } from '../types';

export const TODOS = 'https://jsonplaceholder.typicode.com/todos';
export const SIGN_UP = '/users/sign-up';
export const LOGIN = 'users/login';
export const CURRENT_USER = '/users/me';

// Groups endpoints
export const GROUPS = '/groups';
export const SINGLE_GROUP = groupId => `${GROUPS}/${groupId}`;
export const GET_GROUPS = (groupName = '') => `${GROUPS}?searchQuery=${groupName}`;
export const GROUP_RANKING = (groupId, tournamentRoundId) =>
  `${SINGLE_GROUP}/leader-board/${tournamentRoundId}`;
export const JOIN_GROUP = (groupId: string) => `${SINGLE_GROUP(groupId)}/join-group`;

// Games endpoints
export const TOURNAMENTS = `/tournaments`;
export const GET_GAMES = (status: GAME_STATUS) => `${TOURNAMENTS}/games?gameStatus=${status}`;
export const GET_LIVE_SCORES = myScores =>
  `${TOURNAMENTS}/live-scores${!!myScores ? `?myScores=${myScores}` : ''}`;
export const PICKS = '/picks';
