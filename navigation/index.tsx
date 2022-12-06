import { NavigationContainer } from '@react-navigation/native';
import { ColorSchemeName, View } from 'react-native';

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
import { ToastProvider } from 'react-native-toast-notifications';
import SelectTourScreen from '../screens/main/onboarding/SelectTour';
import CreateGroupScreen from '../screens/main/groups/Create';
import JoinGroupScreen from '../screens/main/groups/Join';
import ShareGroupScreen from '../screens/main/groups/Share';
import JoinGroupSuccessScreen from '../screens/main/groups/JoinSuccess';
import SetupTypeScreen from '../screens/main/onboarding/SetupType';
import SliderScreen from '../screens/main/onboarding/Slider';
import SettingsScreen from '../screens/main/settings';
import NotificationScreen from '../screens/main/settings/Notification';
import ProfileScreen from '../screens/main/settings/Profile';

const Stack = createStackNavigator();

function MainNavigator({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const { isLoggedIn } = useAppSelector(state => state.auth);
  const isOnboarded = useAppSelector(({ auth }) => auth.completedOnboarding);
  return (
    <ToastProvider textStyle={{ fontSize: 18 }}>
      <NavigationContainer
        linking={LinkingConfiguration}
        theme={colorScheme === 'dark' ? AppDarkTheme : AppDefaultTheme}
      >
        <Stack.Navigator>
          {isLoggedIn ? (
            <Stack.Group screenOptions={{ headerShown: false }}>
              {/* The onboarding entity screens */}
              <Stack.Group screenOptions={{ headerShown: false }}>
                {isOnboarded ? (
                  <Stack.Screen name='Slider' component={SliderScreen} />
                ) : (
                  <Stack.Screen name='SetupType' component={SetupTypeScreen} />
                )}
              </Stack.Group>
              <Stack.Screen name='Tabs' component={BottomTabNavigator} />
              {/* The user | settings entity screens */}
              <Stack.Group screenOptions={defaultScreenOptions}>
                <Stack.Screen
                  name='SettingList'
                  component={SettingsScreen}
                  options={{ title: 'Settings' }}
                />
                <Stack.Screen name='Notifications' component={NotificationScreen} />
                <Stack.Screen name='Profile' component={ProfileScreen} />
              </Stack.Group>
              {/* The groups entity screens */}
              <Stack.Group screenOptions={{ ...defaultScreenOptions, title: '' }}>
                <Stack.Screen name='CreateGroup' component={CreateGroupScreen} />
                <Stack.Screen name='JoinGroup' component={JoinGroupScreen} />
                <Stack.Screen name='ShareGroup' component={ShareGroupScreen} />
                <Stack.Screen name='SuccessGroup' component={JoinGroupSuccessScreen} />
              </Stack.Group>
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
          <Stack.Group
            screenOptions={{ presentation: 'modal', ...defaultScreenOptions, title: '' }}
          >
            <Stack.Screen
              name='SearchGroup'
              component={SearchGroup}
              options={{ presentation: 'modal' }}
            />
            <Stack.Screen name='SelectTour' component={SelectTourScreen} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </ToastProvider>
  );
}

export default MainNavigator;
