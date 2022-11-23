import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { default as LoginScreen, default as SignUpScreen } from '../../screens/auth/Login';

const Stack = createNativeStackNavigator();

function AuthNavigator() {
  return (
    <Stack.Group>
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='SignUp' component={SignUpScreen} />
    </Stack.Group>
  );
}

export default AuthNavigator;
