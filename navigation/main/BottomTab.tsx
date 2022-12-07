import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect } from 'react';
import BracketScreen from '../../screens/main/tabs/bracket';
import ChatScreen from '../../screens/main/tabs/chat';
import PicksScreen from '../../screens/main/tabs/picks';
import RankingScreen from '../../screens/main/tabs/ranking';
import ScoresScreen from '../../screens/main/tabs/scores';

import { FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useTheme } from '@react-navigation/native';
import { ActivityIndicator, SafeAreaView, View } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import styled from 'styled-components/native';
import TopTab from '../../components/common/TopTab';
import { defaultScreenOptions } from '../../constants';
import { useCreatePickMutation } from '../../store/api-queries/tournaments';
import { H2, H3, Horizontal } from '../../styles/styled-elements';

const Touchable = styled.Pressable`
  border-width: 1px;
  border-radius: 8px;
  padding-horizontal: 20px;
  padding-vertical: 8px;
`;

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { colors } = useTheme();
  const [savePicks, { isLoading, isError, error }] = useCreatePickMutation();
  const navigation = useNavigation();
  const toast = useToast();
  useEffect(() => {
    if (isError) {
      const { message } = error?.data;
      toast.show(message, { type: 'danger', placement: 'center', animationType: 'zoom-in' });
    }
  }, [isError, error]);

  const goToSettings = () => {
    navigation.navigate('SettingList');
  };

  const handlePress = title => {
    // console.log('The tobtab pressed', title);
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
          header: () => (
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
          header: ({ route: { params: { picks = [], groupId } = {} } }) => {
            const canSubmit = picks.length && groupId && !isLoading;
            return (
              <SafeAreaView style={{ backgroundColor: 'white' }}>
                <Horizontal style={{ marginRight: 20 }}>
                  <View style={{ flex: 0.4 }} />
                  <H2>Picks</H2>
                  <Touchable
                    style={{ borderColor: canSubmit ? colors.primary : '#CFCFCF' }}
                    disabled={!canSubmit}
                    onPress={() => {
                      savePicks({ picks, groupId });
                    }}
                  >
                    {isLoading ? (
                      <ActivityIndicator color={colors.primary} />
                    ) : (
                      <H3 style={{ color: canSubmit ? colors.primary : '#CFCFCF' }}>Save</H3>
                    )}
                  </Touchable>
                </Horizontal>
              </SafeAreaView>
            );
          },
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
        name='Chat'
        component={ChatScreen}
        options={{
          tabBarIcon: props => <Ionicons name='chatbubbles' {...props} />,
          headerShadowVisible: true,
        }}
      />
      <Tab.Screen
        name='Bracket'
        component={BracketScreen}
        options={{
          tabBarIcon: props => <FontAwesome name='sitemap' {...props} />,
          headerShadowVisible: true,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
