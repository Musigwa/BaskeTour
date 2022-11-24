/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { NavigatorScreenParams } from '@react-navigation/native';
import { IGroup } from '../interfaces';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type AuthStackParamList = {
  Initial: undefined;
  Login: undefined;
  CreateAccount: undefined;
  Photo: undefined;
  Onboarding: undefined;
};

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Setup: NavigatorScreenParams<SetupStackParamList> | undefined;
  Modal: undefined;
  GroupList: undefined;
  NotFound: undefined;
  JoinGroup: NavigatorScreenParams<JoinGroupStackParamList> | undefined;
};

export type SetupStackParamList = {
  ActionType: undefined;
  CreateGroup: undefined;
  ShareGroup: undefined;
  [x: string]: any;
};

export type JoinGroupStackParamList = {
  SearchGroup: undefined;
  FullGroup: { group: IGroup };
  Join: { group: IGroup };
  Success: { group: IGroup };
};

export type RootTabParamList = {
  Scores: undefined;
  Picks: undefined;
};

export interface IntStyleProps {
  [key: string]: any;
}

export type GAME_STATUS = 'STATUS_FINAL' | 'STATUS_SCHEDULED' | 'STATUS_IN_PROGRESS';
