import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import GroupsScreen from '../../screens/main/settings/Groups';
import NotificationScreen from '../../screens/main/settings/Notification';
import ProfileScreen from '../../screens/main/settings/Profile';

const Stack = createStackNavigator();

function SettingsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Group
        navigationKey='Settings'
        // screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name='Groups' component={GroupsScreen} />
        <Stack.Screen name='Notifications' component={NotificationScreen} />
        <Stack.Screen name='Profile' component={ProfileScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default SettingsNavigator;
