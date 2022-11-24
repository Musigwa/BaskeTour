import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useState } from 'react';
import BracketScreen from '../../screens/main/tabs/bracket';
import ScoresScreen from '../../screens/main/tabs/scores';
import PicksScreen from '../../screens/main/tabs/picks';
import ChatScreen from '../../screens/main/tabs/chat';
import RankingScreen from '../../screens/main/tabs/ranking';

import { FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import TopBarHeader from '../../components/TopBarHeader';
import { H2, H3, Horizontal } from '../../styles/styled-elements';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import Header from '../../components/scores/Header';
import { useTheme } from '@react-navigation/native';
import TopTab from '../../components/common/TopTab';

const Touchable = styled.TouchableOpacity`
  border-color: #cfcfcf;
  border-width: 2px;
  padding-horizontal: 20px;
  padding-vertical: 8px;
  border-radius: 8px;
`;

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name='Scores'
        component={ScoresScreen}
        options={{
          header: ({ navigation }) => {
            const handlePress = title => {
              // Update the params to refrect changes on the screens
            };

            const goToSettings = title => {
              navigation.navigate('Settings', { screen: 'SettingList' });
            };

            const headerParts = [
              { title: 'All Scores', iconName: 'basketball', onPress: handlePress },
              { title: 'My Scores', iconName: 'basketball', onPress: handlePress },
              { iconName: 'settings', onPress: goToSettings },
            ];

            return (
              <SafeAreaView>
                <TopTab tabs={headerParts} />
              </SafeAreaView>
            );
          },
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='scoreboard' size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='Picks'
        component={PicksScreen}
        options={{
          tabBarIcon: props => <MaterialCommunityIcons name='checkbox-marked-circle' {...props} />,
          headerTitle: props => <H2 {...props}>Picks</H2>,
          headerRight: props => (
            <Touchable activeOpacity={0.5} style={{ marginRight: 20 }} {...props}>
              <H3 style={{ color: '#CFCFCF' }}>Save</H3>
            </Touchable>
          ),
          headerShadowVisible: false,
        }}
      />
      <Tab.Screen
        name='Ranking'
        component={RankingScreen}
        options={{
          tabBarIcon: props => <MaterialIcons name='leaderboard' {...props} />,
          headerTitle: () => <H2>Leader Board</H2>,
          // headerShadowVisible: false,
        }}
      />
      <Tab.Screen
        name='Chat'
        component={ChatScreen}
        options={{
          tabBarIcon: props => <Ionicons name='chatbubbles' {...props} />,
          headerTitle: () => <H2>Chat</H2>,
        }}
      />
      <Tab.Screen
        name='Bracket'
        component={BracketScreen}
        options={{
          tabBarIcon: props => <FontAwesome name='sitemap' {...props} />,
          headerTitle: () => <H2>Bracket</H2>,
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
