import { StyleSheet, Button, Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const BoardOverScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>BoardOverScreen</Text>
      <Button title='Go to Main' onPress={() => navigation.navigate('Tabs')} />
    </View>
  );
};

export default BoardOverScreen;

const styles = StyleSheet.create({});
