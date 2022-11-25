import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable } from 'react-native';
import { H4, Horizontal, Separator } from '../../styles/styled-elements';

const GroupSelector = ({ title = 'Select a group' }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('SearchGroup');
  };

  return (
    <Pressable onPress={handlePress}>
      <Horizontal style={{ justifyContent: 'center', marginVertical: 15 }}>
        <H4 style={{ paddingRight: 20 }}>{title}</H4>
        <Entypo name='chevron-small-down' size={24} color='black' />
      </Horizontal>
      <Separator />
    </Pressable>
  );
};

export default GroupSelector;
