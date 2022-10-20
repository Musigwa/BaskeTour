import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { JoinGroupStackParamList } from "../types";
import SearchGroup, { searchGroupScreenOptions } from "../screens/SearchGroup";
import FullGroupScreen, { fullGroupScreenOptions } from "../screens/FullGroup";
import JoinGroupSuccessScreen, {
  joinGroupSuccessScreenOptions,
} from "../screens/JoinGroupSuccess";
import JoinGroupScreen, { joinGroupScreenOptions } from "../screens/JoinGroup";

const JoinGroupStack = createStackNavigator<JoinGroupStackParamList>();

const JoinGroupNavigation = () => (
  <JoinGroupStack.Navigator>
    <JoinGroupStack.Screen
      name="SearchGroup"
      component={SearchGroup}
      options={searchGroupScreenOptions}
    />
    <JoinGroupStack.Screen
      name="FullGroup"
      component={FullGroupScreen}
      options={fullGroupScreenOptions}
    />

    <JoinGroupStack.Screen
      name="Success"
      component={JoinGroupSuccessScreen}
      options={joinGroupSuccessScreenOptions}
    />
    <JoinGroupStack.Screen
      name="Join"
      component={JoinGroupScreen}
      options={joinGroupScreenOptions}
    />
  </JoinGroupStack.Navigator>
);

export default JoinGroupNavigation;
