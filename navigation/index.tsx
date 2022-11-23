// /**
//  * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
//  * https://reactnavigation.org/docs/getting-started
//  *
//  */
//  import 'react-native-gesture-handler';
// import * as React from 'react';
// import { ColorSchemeName } from 'react-native';
// import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
// import RootNavigator from './RootNavigator'

// import LinkingConfiguration from './LinkingConfiguration';

// export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
//   return (
//     <NavigationContainer
//       linking={LinkingConfiguration}
//       theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <RootNavigator />
//     </NavigationContainer>
//   );
// }

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LoginScreen from '../screens/auth/Login';
import SignUpScreen from '../screens/auth/SignUp';
import BottomTabNavigator from './main/BottomTab';
import OnboardingNavigator from './main/Onboarding';
import SettingsNavigator from './main/Settings';

const Stack = createStackNavigator();

function MainNavigator() {
  const isLoggedIn = true;
  return (
    <NavigationContainer>
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
          <Stack.Group>
            <Stack.Screen name='SignUp' component={SignUpScreen} />
            <Stack.Screen name='Login' component={LoginScreen} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigator;
