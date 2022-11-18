import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import AllScoresScreen from '../screens/AllScoresScreen';
import MyScores from '../screens/MyScores';
import TabBallIcon from '../assets/svgs/TabBallIcon';

import { Horizontal, Paragraph } from '../styles/styled-elements';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { View, Text } from 'react-native';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createMaterialTopTabNavigator();

const ScoresTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarActiveTintColor: '#FF755B',
        tabBarInactiveTintColor: '#7B7B7B',
        // tabBarBadge: () => <Paragraph>View</Paragraph>,
        tabBarIndicatorStyle: { backgroundColor: '#FF755B' },
        tabBarItemStyle: {
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        },
      })}
    >
      <Tab.Screen
        name='All Scores'
        component={AllScoresScreen}
        options={{
          tabBarLabel: ({ focused }) => {
            const color = focused ? '#FF755B' : '#7B7B7B';
            return (
              <Horizontal>
                <MaterialIcons
                  name='sports-basketball'
                  size={24}
                  color={focused ? '#FF755B' : '#7B7B7B'}
                />
                <TabLabel style={{ color }}>All Scores</TabLabel>
              </Horizontal>
            );
          },
        }}
      />
      <Tab.Screen
        name='My Scores'
        component={MyScores}
        options={{
          tabBarLabel: ({ focused }) => {
            const color = focused ? '#FF755B' : '#7B7B7B';
            return (
              <Horizontal>
                <MaterialIcons
                  name='sports-basketball'
                  size={24}
                  color={focused ? '#FF755B' : '#7B7B7B'}
                />
                <TabLabel style={{ color }}>My Scores</TabLabel>
              </Horizontal>
            );
          },
        }}
      />

      <Tab.Screen
        name='Settings'
        component={SettingsScreen}
        options={{
          tabBarLabel: ({ focused }) => {
            const color = focused ? '#FF755B' : '#7B7B7B';
            return (
              <Horizontal>
                <FontAwesome name='gear' size={24} color={focused ? '#FF755B' : 'black'} />
              </Horizontal>
            );
          },
          tabBarIndicator: () => null,
          title: () => null,
          tabBarLabelStyle: { width: 100 },
        }}
      />
    </Tab.Navigator>
  );
};

const TabLabel = styled.Text`
  font-size: 18px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: -0.165px;
  text-align: center;
  margin-left: 10px;
`;

export default ScoresTabNavigator;
