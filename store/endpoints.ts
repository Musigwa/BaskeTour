import { buildQueryParams } from '../utils/methods';

export const TODOS = 'https://jsonplaceholder.typicode.com/todos';
// Users endpoints

export const SIGN_UP = '/users/sign-up';
export const LOGIN = 'users/login';
export const CURRENT_USER = '/users/me';
export const FORGOT_PASSWORD = '/users/recover-password';
export const RESET_PASSWORD = '/users/reset-password';
export const CHANGE_PASSWORD = '/users/me/change-password';

export const CHAT = '/group-chat';
// Groups endpoints
export const GROUPS = '/groups';
export const SINGLE_GROUP = groupId => `${GROUPS}/${groupId}`;
export const GET_GROUPS = (groupName = '', page, perPage) =>
  `${GROUPS}?searchQuery=${groupName}&page=${page}&perPage=${perPage}`;
export const MY_GROUPS = (groupName = '', page, perPage) =>
  `${GROUPS}/user-groups?searchQuery=${groupName}&page=${page}&perPage=${perPage}`;
export const GROUP_RANKING = (groupId, roundId) =>
  `${SINGLE_GROUP(groupId)}/leader-board?roundId=${roundId}`;
export const JOIN_GROUP = (groupId: string) => `${SINGLE_GROUP(groupId)}/join-group`;
export const DELETE_GROUP = (groupId: string) => `${GROUPS}/${groupId}`;
export const DELETE_GROUP_PLAYER = (groupId: string) => `${SINGLE_GROUP(groupId)}/remove-player`;
export const USER_CONVERSATIONS = `${CHAT}/conversations`;
export const GROUP_CHATS = (groupId: string) => `${CHAT}/${groupId}/messages`;
export const MARK_AS_READ = (groupId: string) => `${CHAT}/${groupId}/view-messages`;

// Games endpoints
export const TOURNAMENTS = `/tournaments`;
export const GET_SCORES = (
  { roundId }: { [key: string]: any },
  qeryParams: { [key: string]: any },
  options?: { [key: string]: any }
) => {
  const { myScores = false } = options ?? {};
  return `${TOURNAMENTS}/rounds/${roundId}/${myScores ? 'my-scores' : 'games'}?${buildQueryParams(
    qeryParams
  )}`;
};

export const PICKS = '/picks';
export const MY_PICKS = (tournamentId, roundId, groupId) =>
  `${PICKS}/my-picks?tournamentId=${tournamentId}&roundId=${roundId}&groupId=${groupId}`;
