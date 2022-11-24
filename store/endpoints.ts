import { GAME_STATUS } from '../types';

export const TODOS = 'https://jsonplaceholder.typicode.com/todos';
export const SIGN_UP = '/users/sign-up';
export const LOGIN = 'users/login';
export const CURRENT_USER = '/users/me';

export const GET_GROUPS = (groupName = '') => `/groups?searchQuery=${groupName}`;

export const JOIN_GROUP = (groupId: string) => `/groups/${groupId}/join-group`;
export const GROUPS = '/groups';

export const GET_GAMES = (status: GAME_STATUS) => `/tournaments/games?gameStatus=${status}`;
