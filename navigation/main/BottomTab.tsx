import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect } from 'react';
import PicksScreen from '../../screens/main/tabs/picks';
import RankingScreen from '../../screens/main/tabs/ranking';
import ScoresScreen from '../../screens/main/tabs/scores';

import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import styled from 'styled-components/native';
import TopTab from '../../components/common/TopTab';
import { defaultScreenOptions } from '../../constants';
import { useCreatePickMutation } from '../../store/api-queries/tournaments';
import { Horizontal } from '../../styles/styled-elements';
import ChatNavigator from './Chat';

const Touchable = styled.Pressable`
  border-width: 1px;
  border-radius: 8px;
  padding-horizontal: 20px;
  padding-vertical: 8px;
`;

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const toast = useToast();

  const goToSettings = () => {
    navigation.navigate('SettingList');
  };

  const handlePress = ({ title }) => {
    navigation.setParams({ screen: 'Scores', params: { scoreType: title } });
    // Update the params to refrect changes on the screens
  };

  const headerParts = [
    { title: 'All Scores', iconName: 'basketball', onPress: handlePress },
    { title: 'My Scores', iconName: 'basketball', onPress: handlePress },
  ];

  return (
    <Tab.Navigator
      screenOptions={{
        headerRight: ({ tintColor }) => (
          <Ionicons
            name='settings'
            size={24}
            color={tintColor}
            style={{ marginRight: 20 }}
            onPress={goToSettings}
          />
        ),
        ...defaultScreenOptions,
      }}
    >
      <Tab.Screen
        name='Scores'
        component={ScoresScreen}
        options={{
          header: () => {
            return (
              <SafeAreaView>
                <Horizontal>
                  <TopTab tabs={headerParts} onTabPress={handlePress} />
                  <Ionicons
                    name='settings'
                    size={24}
                    style={{ marginRight: 20 }}
                    onPress={goToSettings}
                  />
                </Horizontal>
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
        }}
      />
      <Tab.Screen
        name='Ranking'
        component={RankingScreen}
        options={{
          tabBarIcon: props => <MaterialIcons name='leaderboard' {...props} />,
          headerTitle: 'Leader Board',
        }}
      />
      <Tab.Screen
        name='Chats'
        component={ChatNavigator}
        options={{
          tabBarIcon: props => <Ionicons name='chatbubbles' {...props} />,
          headerShadowVisible: true,
          headerShown: false,
        }}
      />
      {/* <Tab.Screen
        name='Bracket'
        component={BracketScreen}
        options={{
          tabBarIcon: props => <FontAwesome name='sitemap' {...props} />,
          headerShadowVisible: true,
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
