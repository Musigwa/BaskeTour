import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import GroupsScreen from '../../screens/main/groups';
import CreateGroupScreen from '../../screens/main/groups/Create';
import JoinGroupScreen from '../../screens/main/groups/Join';
import SearchGroup from '../../screens/main/groups/Search';
import ShareGroupScreen from '../../screens/main/groups/Share';
import SettingsScreen from '../../screens/main/settings';
import NotificationScreen from '../../screens/main/settings/Notification';
import ProfileScreen from '../../screens/main/settings/Profile';

const Stack = createStackNavigator();

const defaultOptions = {
  headerShown: true,
  headerBackTitleVisible: false,
  headerShadowVisible: false,
  headerTintColor: 'black',
};

function SettingsNavigator() {
  return (
    <Stack.Navigator screenOptions={defaultOptions}>
      <Stack.Screen name='SettingList' component={SettingsScreen} options={{ title: 'Settings' }} />
      <Stack.Group navigationKey='Groups'>
        <Stack.Screen name='CreateGroup' component={CreateGroupScreen} />
        <Stack.Screen name='SearchGroup' component={SearchGroup} />
        <Stack.Screen name='JoinGroup' component={JoinGroupScreen} />
        <Stack.Screen name='ShareGroup' component={ShareGroupScreen} />
      </Stack.Group>
      <Stack.Screen name='Notifications' component={NotificationScreen} />
      <Stack.Screen name='Profile' component={ProfileScreen} />
    </Stack.Navigator>
  );
}

export default SettingsNavigator;
