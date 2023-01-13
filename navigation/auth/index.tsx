import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import LoginScreen from '../../screens/auth/Login';
import SignUpScreen from '../../screens/auth/SignUp';
import PhotoScreen from '../../screens/auth/Photo';
import InitialScreen from '../../screens/auth/Initial';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Group screenOptions={{ headerShown: false }} navigationKey='Auth'>
      <Stack.Screen name='Initial' component={InitialScreen} />
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='SignUp' component={SignUpScreen} />
      <Stack.Screen name='Photo' component={PhotoScreen} />
    </Stack.Group>
  );
};

export default AuthNavigator;
