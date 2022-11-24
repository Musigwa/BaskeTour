import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useAppSelector } from '../../hooks/useStore';
import SetupTypeScreen from '../../screens/main/onboarding/SetupType';
import SliderScreen from '../../screens/main/onboarding/Slider';

const Stack = createStackNavigator();

function OnboardingNavigator() {
  const isOnboarded = useAppSelector(({ auth }) => auth.completedOnboarding);
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{ headerShown: false }}>
        {isOnboarded ? (
          <Stack.Screen name='Slider' component={SliderScreen} />
        ) : (
          <Stack.Screen name='SetupType' component={SetupTypeScreen} />
        )}
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default OnboardingNavigator;
