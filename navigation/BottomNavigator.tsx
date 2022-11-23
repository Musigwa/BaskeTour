import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import styled from "styled-components/native";
import TopBarHeader from "../components/TopBarHeader";
import Bracketscreen from "../screens/BracketScreen";
import ChatScreen from "../screens/ChatScreen";
import PicksScreeen from "../screens/PicksScreen";
import RankingScreen from "../screens/RankingScreen";
import { H2, H3 } from "../styles/styled-elements";
import PicksNavigation from "./PicksNavigation";
import RankingNavigator from "./RankingNavigator";
import ScoresTabNavigator from "./ScoresTabNavigator";

const Touchable = styled.TouchableOpacity`
  border-color: #cfcfcf;
  border-width: 2px;
  padding-horizontal: 20px;
  padding-vertical: 8px;
  border-radius: 8px;
`;

const Tab = createBottomTabNavigator();

export default function BottomTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Scores"
        component={ScoresTabNavigator}
        options={{
          header: () => <TopBarHeader />,
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons name="scoreboard" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Picks"
        component={PicksNavigation}
        options={{
          tabBarIcon: (props) => (
            <MaterialCommunityIcons name="checkbox-marked-circle" {...props} />
          ),
          // headerTitle: (props) => <H2 {...props}>Picks</H2>,
          // headerRight: (props) => (
          //   <Touchable
          //     activeOpacity={0.5}
          //     style={{ marginRight: 20 }}
          //     {...props}
          //   >
          //     <H3 style={{ color: "#CFCFCF" }}>Save</H3>
          //   </Touchable>
          // ),
          // headerShadowVisible: false,
          header: () => null,
        }}
      />
      <Tab.Screen
        name="Ranking"
        component={RankingNavigator}
        options={{
          tabBarIcon: (props) => (
            <MaterialIcons name="leaderboard" {...props} />
          ),
          headerTitle: () => <H2>Leader Board</H2>,
          headerShadowVisible: false,
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarIcon: (props) => <Ionicons name="chatbubbles" {...props} />,
          headerTitle: () => <H2>Chat</H2>,
        }}
      />
      <Tab.Screen
        name="Bracket"
        component={Bracketscreen}
        options={{
          tabBarIcon: (props) => <FontAwesome name="sitemap" {...props} />,
          headerTitle: () => <H2>Bracket</H2>,
        }}
      />
    </Tab.Navigator>
  );
}
