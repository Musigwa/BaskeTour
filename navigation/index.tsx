// Absolute imports
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { ColorSchemeName } from 'react-native';
import { ToastProvider } from 'react-native-toast-notifications';
// Relative imports
import { defaultScreenOptions } from '../constants';
import { useAppSelector } from '../hooks/useStore';
import InitialScreen from '../screens/auth/Initial';
import LoginScreen from '../screens/auth/Login';
import PhotoScreen from '../screens/auth/Photo';
import SignUpScreen from '../screens/auth/SignUp';
import CreateGroupScreen from '../screens/main/groups/Create';
import GroupDetailsScreen from '../screens/main/groups/Details';
import JoinGroupScreen from '../screens/main/groups/Join';
import JoinGroupSuccessScreen from '../screens/main/groups/JoinSuccess';
import GroupListScreen from '../screens/main/groups/List';
import SearchGroup from '../screens/main/groups/Search';
import ShareGroupScreen from '../screens/main/groups/Share';
import SetupTypeScreen from '../screens/main/onboarding/SetupType';
import SliderScreen from '../screens/main/onboarding/Slider';
import SettingsScreen from '../screens/main/settings';
import NotificationScreen from '../screens/main/settings/Notification';
import ProfileScreen from '../screens/main/settings/Profile';
import { AppDarkTheme, AppDefaultTheme } from '../styles/theme';
import { ellipsizeText } from '../utils/methods';
import LinkingConfiguration from './LinkingConfiguration';
import BottomTabNavigator from './main/BottomTab';
import ForgetPwdScreen from '../screens/auth/Forget';
import VerifyScreen from '../screens/auth/Verify';
import ResetPwdScreen from '../screens/auth/Reset';

const Stack = createStackNavigator();

const MainNavigator = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {
  const { isLoggedIn } = useAppSelector(state => state.auth);
  const isOnboarded = useAppSelector(({ auth }) => auth.completedOnboarding);

  return (
    <ToastProvider textStyle={{ fontSize: 18 }}>
      <NavigationContainer
        linking={LinkingConfiguration}
        theme={colorScheme === 'dark' ? AppDarkTheme : AppDefaultTheme}
      >
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {isLoggedIn ? (
            <Stack.Group>
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
                    headerRightContainerStyle: { paddingRight: 5 },
                  })}
                />
                <Stack.Screen
                  name='SearchGroup'
                  component={SearchGroup}
                  options={({ route }) => ({
                    title: route?.params?.title ?? 'Join Existing Group',
                  })}
                />
              </Stack.Group>
            </Stack.Group>
          ) : (
            // Authentication & authorization screens
            <Stack.Group screenOptions={{ ...defaultScreenOptions, headerTitle: '' }}>
              <Stack.Screen
                name='Initial'
                component={InitialScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen name='Login' component={LoginScreen} />
              <Stack.Screen name='SignUp' component={SignUpScreen} />
              <Stack.Screen name='Photo' component={PhotoScreen} />
              <Stack.Screen name='Forget' component={ForgetPwdScreen} />
              <Stack.Screen name='Verify' component={VerifyScreen} />
              <Stack.Screen name='Reset' component={ResetPwdScreen} />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </ToastProvider>
  );
};

export default MainNavigator;
