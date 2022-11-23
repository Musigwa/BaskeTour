import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import BracketScreen from '../../screens/main/tabs/bracket';
import ScoresScreen from '../../screens/main/tabs/scores';
import PicksScreen from '../../screens/main/tabs/picks';
import ChatScreen from '../../screens/main/tabs/chat';
import RankingScreen from '../../screens/main/tabs/ranking';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Scores' component={ScoresScreen} />
      <Tab.Screen name='Picks' component={PicksScreen} />
      <Tab.Screen name='Ranking' component={RankingScreen} />
      <Tab.Screen name='Chat' component={ChatScreen} />
      <Tab.Screen name='Bracket' component={BracketScreen} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
