import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import GroupsScreen from '../../screens/main/groups';
import CreateGroupScreen from '../../screens/main/groups/Create';
import JoinGroupScreen from '../../screens/main/groups/Join';
import SearchGroup from '../../screens/main/groups/Search';
import NotificationScreen from '../../screens/main/settings/Notification';
import ProfileScreen from '../../screens/main/settings/Profile';

const Stack = createStackNavigator();

const defaultOptions = {
  headerShown: true,
  headerTitle: '',
  headerBackTitleVisible: false,
  headerShadowVisible: false,
  headerTintColor: 'black',
};

function SettingsNavigator() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name='Settings' component={GroupsScreen} /> */}
      <Stack.Group navigationKey='Groups' screenOptions={defaultOptions}>
        <Stack.Screen name='CreateGroup' component={CreateGroupScreen} />
        <Stack.Screen name='SearchGroup' component={SearchGroup} />
        <Stack.Screen name='JoinGroup' component={JoinGroupScreen} />
      </Stack.Group>
      <Stack.Screen name='Notifications' component={NotificationScreen} />
      <Stack.Screen name='Profile' component={ProfileScreen} />
    </Stack.Navigator>
  );
}

export default SettingsNavigator;
