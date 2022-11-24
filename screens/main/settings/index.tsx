import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>SettingsScreen</Text>
      <Button title='Go to Notification' onPress={() => navigation.navigate('Notifications')} />
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});
