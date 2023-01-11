import React from 'react';
import { StyleSheet, View } from 'react-native';
import { H5 } from '../../../../styles/styled-elements';

const EmpytList = () => {
  return (
    <View style={styles.container}>
      <H5>No data matching your search to display!</H5>
    </View>
  );
};

export default EmpytList;

const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center', marginTop: 50 },
});
