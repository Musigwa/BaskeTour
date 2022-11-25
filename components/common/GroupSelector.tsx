import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Pressable, View } from 'react-native';
import { H4, Horizontal, Separator } from '../../styles/styled-elements';

const GroupSelector = ({ title, onGroupSelect }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('SearchGroup', { confirmBtn: { onPress: onGroupSelect } });
  };

  return (
    <Pressable onPress={handlePress} style={{ marginVertical: 15, alignSelf: 'center' }}>
      <Horizontal>
        <H4 style={{ paddingRight: 20 }}>{title}</H4>
        <Entypo name='chevron-small-down' size={24} color='black' />
      </Horizontal>
      <Separator />
    </Pressable>
  );
};

export default GroupSelector;
