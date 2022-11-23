import { StyleSheet, Button, Text, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const SliderScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>SliderScreen</Text>
      <Button title='Go to BoardOver' onPress={() => navigation.navigate('BoardOver')} />
    </View>
  );
};

export default SliderScreen;

const styles = StyleSheet.create({});
