import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { Switch, View } from 'react-native';
import { H4, Horizontal, Separator } from '../../../styles/styled-elements';

const NotificationScreen = () => {
  const { colors } = useTheme();
  const [options, setOptions] = useState({
    General: false,
    'New chat messages': true,
    'Get picks in reminder': false,
    'New round is open': true,
    'Add more spots to group': true,
    'Your pick won/lost': false,
  });

  const handleToggle = optionName => {
    setOptions(state => ({ ...state, [optionName]: !state[optionName] }));
  };

  return (
    <View style={{ flex: 1, marginHorizontal: 24 }}>
      <Separator style={{ paddingVertical: 10 }} size='invisible' />
      {Object.keys(options).map((op, idx) => {
        return (
          <View key={idx}>
            <Horizontal style={{ paddingVertical: 32 }}>
              <H4>{op}</H4>
              <Switch
                trackColor={{ true: colors.primary }}
                value={options[op]}
                onChange={() => handleToggle(op)}
              />
            </Horizontal>
            <Separator />
          </View>
        );
      })}
    </View>
  );
};

export default NotificationScreen;
