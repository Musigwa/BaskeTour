/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import "react-native-gesture-handler";
import * as React from "react";
import { ColorSchemeName, useColorScheme } from "react-native";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import RootNavigator from "./RootNavigator";

import LinkingConfiguration from "./LinkingConfiguration";

const MyDarkTheme = {
  ...DarkTheme,
  background: "black",
};
const MyLightTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    primary: "#FF755B",
    border: "#7B7B7B",
    background: "white",
  },
};

export default () => {
  const scheme = useColorScheme();
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={scheme === "dark" ? MyDarkTheme : MyLightTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
};
