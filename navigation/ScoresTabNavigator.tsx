import React, { useEffect } from "react";
import styled from "styled-components/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import AllScoresScreen from "../screens/AllScoresScreen";
import MyScores from "../screens/MyScores";
import TabBallIcon from "../assets/svgs/TabBallIcon";

import { Paragraph, View } from "../styles/styled-elements";


const Tab = createMaterialTopTabNavigator();

const ScoresTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#FF755B",
        tabBarInactiveTintColor: "#7B7B7B",
        // tabBarBadge: () => <Paragraph>View</Paragraph>,
        tabBarIndicatorStyle: { backgroundColor: "#FF755B" },
      }}
    >
      <Tab.Screen
        name="All Scores"
        component={AllScoresScreen}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <View flex-row items-center>
              <TabBallIcon color={focused ? "#FF755B" : "#7B7B7B"} />
              <TabLabel color={color}>All Scores</TabLabel>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="My Scores"
        component={MyScores}
        options={{
          tabBarLabel: ({ focused, color }) => (
            <View flex-row items-center>
              <TabBallIcon color={focused ? "#FF755B" : "#7B7B7B"} />
              <TabLabel color={color}>My Scores</TabLabel>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const TabLabel = styled(Paragraph)`
  font-size: 18px;
  margin-left: 9px;
  font-weight: bold;
`;

export default ScoresTabNavigator;
