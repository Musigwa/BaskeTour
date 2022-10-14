import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import { AuthStackParamList } from "../types";

import Login from "../screens/LoginScreen";
import CreateAccount from "../screens/CreateAccount";
import InitialScreen from "../screens/InitialScreen";
import PhotoScreen from "../screens/PhotoScreen";
import OnboardingScreen from "../screens/OnboardingScreen"

import ScreenHeader from "../components/common/ScreenHeader";


/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createStackNavigator<AuthStackParamList>();

function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerMode: "screen",
      }}
    >
      <Stack.Screen
        name="Initial"
        component={InitialScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccount}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Photo"
        component={PhotoScreen}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={({ route }) => ({
          header: (props) => <ScreenHeader {...props} />,
        })}
      />
    </Stack.Navigator>
  );
}

export default AuthNavigator;
