import { NavigationContainer, useTheme } from '@react-navigation/native';
import { ColorSchemeName, Alert, View } from 'react-native';

import LinkingConfiguration from './LinkingConfiguration';

import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ToastProvider } from 'react-native-toast-notifications';
import { defaultScreenOptions } from '../constants';
import { useAppSelector } from '../hooks/useStore';
import InitialScreen from '../screens/auth/Initial';
import LoginScreen from '../screens/auth/Login';
import PhotoScreen from '../screens/auth/Photo';
import SignUpScreen from '../screens/auth/SignUp';
import CreateGroupScreen from '../screens/main/groups/Create';
import JoinGroupScreen from '../screens/main/groups/Join';
import JoinGroupSuccessScreen from '../screens/main/groups/JoinSuccess';
import SearchGroup from '../screens/main/groups/Search';
import ShareGroupScreen from '../screens/main/groups/Share';
import SetupTypeScreen from '../screens/main/onboarding/SetupType';
import SliderScreen from '../screens/main/onboarding/Slider';
import SettingsScreen from '../screens/main/settings';
import NotificationScreen from '../screens/main/settings/Notification';
import ProfileScreen from '../screens/main/settings/Profile';
import { AppDarkTheme, AppDefaultTheme } from '../styles/theme';
import BottomTabNavigator from './main/BottomTab';
import GroupListScreen from '../screens/main/groups/List';
import GroupDetailsScreen from '../screens/main/groups/Details';
import { MaterialIcons } from '@expo/vector-icons';
import { ellipsizeText } from '../utils/methods';

const Stack = createStackNavigator();

const MainNavigator = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
  const { isLoggedIn } = useAppSelector(state => state.auth);
  const isOnboarded = useAppSelector(({ auth }) => auth.completedOnboarding);
  const { colors } = useTheme();
  const handleDelete = group => {
    Alert.alert(
      'Confirm your choice',
      `Are you sure you want to delete the "${group.groupName}" group?`,
      [
        { text: 'Cancel', style: 'cancel', onPress: () => {} },
        { text: 'Delete', style: 'destructive' },
      ],
      { cancelable: true }
    );
  };

  return (
    <ToastProvider textStyle={{ fontSize: 18 }}>
      <NavigationContainer
        linking={LinkingConfiguration}
        theme={colorScheme === 'dark' ? AppDarkTheme : AppDefaultTheme}
      >
        <Stack.Navigator>
          {isLoggedIn ? (
            <Stack.Group screenOptions={{ headerShown: false }}>
              <Stack.Screen
                name={isOnboarded ? 'SetupType' : 'Slider'}
                component={isOnboarded ? SetupTypeScreen : SliderScreen}
              />
              <Stack.Screen name='Tabs' component={BottomTabNavigator} />
              {/* The user | settings entity screens */}
              <Stack.Group screenOptions={defaultScreenOptions}>
                <Stack.Screen
                  name='SettingList'
                  component={SettingsScreen}
                  options={{ title: 'Settings' }}
                />
                <Stack.Screen name='Notifications' component={NotificationScreen} />
                <Stack.Screen
                  name='Profile'
                  component={ProfileScreen}
                  options={{ title: 'Profile Settings' }}
                />
              </Stack.Group>
              {/* The groups entity screens */}
              <Stack.Group screenOptions={{ ...defaultScreenOptions, title: '' }}>
                <Stack.Screen name='CreateGroup' component={CreateGroupScreen} />
                <Stack.Screen name='JoinGroup' component={JoinGroupScreen} />
                <Stack.Screen name='ShareGroup' component={ShareGroupScreen} />
                <Stack.Screen name='SuccessGroup' component={JoinGroupSuccessScreen} />
                <Stack.Screen
                  name='Groups'
                  component={GroupListScreen}
                  options={{ title: 'Groups' }}
                />
                <Stack.Screen
                  name='GroupDetails'
                  component={GroupDetailsScreen}
                  options={({ route: { params } }) => ({
                    title: ellipsizeText(params?.group?.groupName, 18),
                    headerRight: () => (
                      <View style={{ alignItems: 'center', justifyContent: 'center', padding: 7 }}>
                        <MaterialIcons
                          name='delete'
                          size={24}
                          color='black'
                          onPress={() => handleDelete(params?.group)}
                        />
                      </View>
                    ),
                    headerRightContainerStyle: { paddingRight: 5 },
                  })}
                />
                <Stack.Screen
                  name='SearchGroup'
                  component={SearchGroup}
                  options={{ presentation: 'modal' }}
                />
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
        </Stack.Navigator>
      </NavigationContainer>
    </ToastProvider>
  );
};

export default MainNavigator;
