import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import { SetupStackParamList } from "../types";

import SetupTypeScreen from "../screens/SetupTypeScreen";
import CreateGroupScreen from "../screens/CreateGroupScreen";

import ScreenHeader from "../components/common/ScreenHeader";

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createStackNavigator<SetupStackParamList>();

function SetupNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: "screen",
      }}
    >
      <Stack.Screen
        name="ActionType"
        component={SetupTypeScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="CreateGroup"
        component={CreateGroupScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default SetupNavigator;
