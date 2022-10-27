import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { useTheme } from "styled-components/native";

import Picks from "../screens/PicksScreen";

import ScoresTabNavigator from "./ScoresTabNavigator";
import TopBarHeader from "../components/TopBarHeader";
import ScoresIcon from "../assets/svgs/ScoresIcon";

import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import { Paragraph } from "../styles/styled-elements";

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const theme = useTheme();
  return (
    <BottomTab.Navigator initialRouteName="Scores">
      <BottomTab.Screen
        name="Scores"
        component={ScoresTabNavigator}
        options={{
          header: () => <TopBarHeader />,
          tabBarLabel: ({ focused }) => (
            <Paragraph size={12} color={focused ? theme.primary : "#000"}>
              Scores
            </Paragraph>
          ),
          tabBarIcon: ({ focused }) => (
            <ScoresIcon color={focused ? theme.primary : "#000"} />
          ),
        }}

        // options={({ navigation }: RootTabScreenProps<"Scores">) => ({
        //   title: "Tab One",
        //   tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        //   headerRight: () => (
        //     <Pressable
        //       onPress={() => navigation.navigate("Modal")}
        //       style={({ pressed }) => ({
        //         opacity: pressed ? 0.5 : 1,
        //       })}
        //     >
        //       <FontAwesome
        //         name="info-circle"
        //         size={25}
        //         color={Colors[colorScheme].text}
        //         style={{ marginRight: 15 }}
        //       />
        //     </Pressable>
        //   ),
        // })}
      />
      <BottomTab.Screen
        name="Picks"
        component={Picks}
        options={{
          title: "Tab Two",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}

export default BottomTabNavigator;
