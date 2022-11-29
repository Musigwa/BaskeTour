import { NavigationContainer } from '@react-navigation/native';
import { ColorSchemeName } from 'react-native';

import LinkingConfiguration from './LinkingConfiguration';

import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { defaultScreenOptions } from '../constants';
import { useAppSelector } from '../hooks/useStore';
import InitialScreen from '../screens/auth/Initial';
import LoginScreen from '../screens/auth/Login';
import PhotoScreen from '../screens/auth/Photo';
import SignUpScreen from '../screens/auth/SignUp';
import SearchGroup from '../screens/main/groups/Search';
import { AppDarkTheme, AppDefaultTheme } from '../styles/theme';
import BottomTabNavigator from './main/BottomTab';
import GroupsNavigator from './main/Groups';
import OnboardingNavigator from './main/Onboarding';
import SettingsNavigator from './main/Settings';

const Stack = createStackNavigator();

function MainNavigator({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const { isLoggedIn } = useAppSelector(state => state.auth);
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? AppDarkTheme : AppDefaultTheme}
    >
      <Stack.Navigator>
        {isLoggedIn ? (
          // Screens for logged in users (Main screens)
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Boarding' component={OnboardingNavigator} />
            <Stack.Screen name='Tabs' component={BottomTabNavigator} />
            <Stack.Screen name='Settings' component={SettingsNavigator} />
            <Stack.Screen name='Groups' component={GroupsNavigator} />
          </Stack.Group>
        ) : (
          // Authentication & authorization screens
          <Stack.Group screenOptions={{ ...defaultScreenOptions, headerTitle: '' }}>
            <Stack.Screen
              name='Initial'
              options={{ headerShown: false }}
              component={InitialScreen}
            />
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='SignUp' component={SignUpScreen} />
            <Stack.Screen name='Photo' component={PhotoScreen} />
          </Stack.Group>
        )}
        <Stack.Group screenOptions={{ presentation: 'modal', ...defaultScreenOptions, title: '' }}>
          <Stack.Screen
            name='SearchGroup'
            component={SearchGroup}
            options={{ presentation: 'modal' }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigator;
