import { ColorSchemeName, SafeAreaView } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';

import LinkingConfiguration from './LinkingConfiguration';

import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useAppSelector } from '../hooks/useStore';
import InitialScreen from '../screens/auth/Initial';
import LoginScreen from '../screens/auth/Login';
import PhotoScreen from '../screens/auth/Photo';
import SignUpScreen from '../screens/auth/SignUp';
import BottomTabNavigator from './main/BottomTab';
import OnboardingNavigator from './main/Onboarding';
import SettingsNavigator from './main/Settings';

const Stack = createStackNavigator();

const defaultOptions = {
  headerShown: true,
  headerTitle: '',
  headerBackTitleVisible: false,
  headerShadowVisible: false,
  headerTintColor: 'black',
};

function MainNavigator({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const { isLoggedIn } = useAppSelector(state => state.auth);
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <Stack.Navigator>
        {isLoggedIn ? (
          // Screens for logged in users (Main screens)
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Boarding' component={OnboardingNavigator} />
            <Stack.Screen name='Tabs' component={BottomTabNavigator} />
            <Stack.Screen name='Settings' component={SettingsNavigator} />
          </Stack.Group>
        ) : (
          // Authentication & authorization screens
          <Stack.Group screenOptions={defaultOptions}>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigator;
