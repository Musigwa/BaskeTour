import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import BracketScreen from '../../screens/main/tabs/bracket';
import ChatScreen from '../../screens/main/tabs/chat';
import PicksScreen from '../../screens/main/tabs/picks';
import RankingScreen from '../../screens/main/tabs/ranking';
import ScoresScreen from '../../screens/main/tabs/scores';

import { FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useTheme } from '@react-navigation/native';
import { SafeAreaView, View } from 'react-native';
import styled from 'styled-components/native';
import TopTab from '../../components/common/TopTab';
import { useCreatePickMutation } from '../../store/api-queries/tournaments';
import { H2, H3, Horizontal } from '../../styles/styled-elements';

const Touchable = styled.TouchableOpacity`
  border-width: 2px;
  padding-horizontal: 20px;
  padding-vertical: 8px;
  border-radius: 8px;
`;

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  const { colors } = useTheme();
  const [savePicks, { isLoading, status, isSuccess, error }] = useCreatePickMutation();
  const navigation = useNavigation();
  console.log('The status,', isSuccess, isLoading, error);

  const goToSettings = () => {
    navigation.navigate('Settings', { screen: 'SettingList' });
  };

  const handlePress = title => {
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
        headerTitleStyle: {
          fontSize: 24,
          fontWeight: '700',
          fontFamily: 'Montserrat_500Medium',
          letterSpacing: -0.165,
          // text-align: center;
          textTransform: 'capitalize',
        },
      }}
    >
      <Tab.Screen
        name='Scores'
        component={ScoresScreen}
        options={{
          header: ({ navigation, route }) => (
            <SafeAreaView>
              <Horizontal>
                <TopTab tabs={headerParts} />
                <Ionicons
                  name='settings'
                  size={24}
                  style={{ marginRight: 20 }}
                  onPress={goToSettings}
                />
              </Horizontal>
            </SafeAreaView>
          ),
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='scoreboard' size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name='Picks'
        component={PicksScreen}
        options={{
          header: ({ route: { params: { canSubmit = false, picks = [] } = {} } }) => (
            <SafeAreaView style={{ backgroundColor: 'white' }}>
              <Horizontal>
                <View style={{ flex: 0.3 }} />
                <H2>Picks</H2>
                <Touchable
                  activeOpacity={0.5}
                  style={{ marginRight: 20, borderColor: canSubmit ? colors.primary : '#CFCFCF' }}
                  disabled={!canSubmit}
                  onPress={() => savePicks(picks)}
                >
                  <H3 style={{ color: canSubmit ? colors.primary : '#CFCFCF' }}>Save</H3>
                </Touchable>
              </Horizontal>
            </SafeAreaView>
          ),
          tabBarIcon: props => <MaterialCommunityIcons name='checkbox-marked-circle' {...props} />,
        }}
      />
      <Tab.Screen
        name='Ranking'
        component={RankingScreen}
        options={{
          tabBarIcon: props => <MaterialIcons name='leaderboard' {...props} />,
          title: 'Leader Board',
        }}
      />
      <Tab.Screen
        name='Chat'
        component={ChatScreen}
        options={{
          tabBarIcon: props => <Ionicons name='chatbubbles' {...props} />,
        }}
      />
      <Tab.Screen
        name='Bracket'
        component={BracketScreen}
        options={{
          tabBarIcon: props => <FontAwesome name='sitemap' {...props} />,
          // headerTitle: () => <H2>Bracket</H2>,
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
