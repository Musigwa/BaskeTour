/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { IGroup } from "./interfaces";

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
  Setup: undefined;
  Modal: undefined;
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
  FullGroup: undefined;
  Join: undefined;
  Success: undefined;
  params: { group: IGroup };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type SetupStackScreenProps<Screen extends keyof SetupStackParamList> =
  NativeStackScreenProps<SetupStackParamList, Screen>;

export type JoinGroupStackScreenProps<
  Screen extends keyof JoinGroupStackParamList
> = NativeStackScreenProps<JoinGroupStackParamList, Screen>;

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

export type AuthScreenProps<Screen extends keyof AuthStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<AuthStackParamList, Screen>,
    CompositeScreenProps<
      BottomTabScreenProps<RootTabParamList>,
      NativeStackScreenProps<RootStackParamList>
    >
  >;
export interface IntStyleProps {
  [key: string]: any;
}
