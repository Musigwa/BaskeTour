export const TODOS = "https://jsonplaceholder.typicode.com/todos";
export const SIGN_UP = "/users/sign-up";
export const LOGIN = "users/login";
export const USERS = "/users/me";
export const GET_GROUPS = (groupName = "") =>
  `/groups?searchQuery=${groupName}`;

export const JOIN_GROUP = (groupId: string) => `/groups/${groupId}/join-group`;
export const GROUPS = "/groups";
