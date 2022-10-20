export interface IGroup {
  groupName: string;
  id: string;
  createdAt: string;
  creator: IUser;
  updatedAd: string;
  slug: string;
  availableSpots?: number;
  players?: Array<IUser>;
  extraPlayers?: number;
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: string;
}

export interface IJoinGroup {
  player: IUser;
  id: string;
  group: string;
}
