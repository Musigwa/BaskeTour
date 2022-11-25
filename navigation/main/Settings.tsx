import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { defaultScreenOptions } from '../../constants';
import SettingsScreen from '../../screens/main/settings';
import NotificationScreen from '../../screens/main/settings/Notification';
import ProfileScreen from '../../screens/main/settings/Profile';

const Stack = createStackNavigator();

function SettingsNavigator() {
  return (
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      <Stack.Screen name='SettingList' component={SettingsScreen} options={{ title: 'Settings' }} />
      <Stack.Screen name='Notifications' component={NotificationScreen} />
      <Stack.Screen name='Profile' component={ProfileScreen} />
    </Stack.Navigator>
  );
}

export default SettingsNavigator;
