import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';
import { H4, Horizontal, Separator } from '../../styles/styled-elements';

type RadioButtonProps = {
  color: string;
  defaultColor?: string;
  style?: TouchableOpacityProps;
  selected: boolean;
  text: string;
  onClick: (text: string) => void;
};

const RadioButton = ({
  defaultColor = 'gray',
  color,
  style,
  selected = false,
  text = 'Group name',
  onClick,
}: RadioButtonProps) => {
  return (
    <TouchableOpacity activeOpacity={0.7} style={{ width: '100%' }} onPress={() => onClick(text)}>
      <Horizontal style={{ paddingVertical: 10 }}>
        <H4>{text}</H4>
        <View style={[styles.container, style, { borderColor: selected ? color : defaultColor }]}>
          {selected ? (
            <View style={[styles.selected, { backgroundColor: selected ? color : defaultColor }]} />
          ) : null}
        </View>
      </Horizontal>
      <Separator size='sm' />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selected: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#000',
  },
});

export default RadioButton;
