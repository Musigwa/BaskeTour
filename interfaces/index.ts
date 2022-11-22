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

export interface Iteam {
  name: string;
  abbreviation: string;
  isAway: boolean;
  isHome: boolean;
  teamId: string;
  ranking: number;
  normalizedId: number;
  score: number;
  isWinner: boolean;
  record: string;
  logo: string;
}

export interface IGame {
  id: string;
  teamA: Iteam;
  teamB: Iteam;
  eventDate: string;
  attendance: number;
  seasonType: string;
  seasonYear: string;
  weekName: string;
  week: number;
  headline: string;
  gameClock: string;
  locationName: string;
}

export interface IPick {
  gameId: string;
  teamId: string;
}
