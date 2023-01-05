import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Horizontal } from '../../../styles/styled-elements';

const NotificationScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Horizontal>
        <Text>NotificationScreen</Text>
      </Horizontal>
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({});
