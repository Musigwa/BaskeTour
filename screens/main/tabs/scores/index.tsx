import { StyleSheet, Button, Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const ScoresScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>ScoresScreen</Text>
      <Button
        title='Go to Notifications'
        onPress={() => navigation.navigate('Settings', { screen: 'Notifications' })}
      />
    </View>
  );
};

export default ScoresScreen;

const styles = StyleSheet.create({});
