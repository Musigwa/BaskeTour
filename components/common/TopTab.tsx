import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { H3, Horizontal } from '../../styles/styled-elements';

const TopTab = ({ tabs }) => {
  const [focused, setFocused] = useState(tabs[0].title);
  const { colors } = useTheme();

  const isFocused = title => title === focused;

  return (
    <Horizontal>
      {tabs.map(({ iconName, onPress, title }, idx) => {
        return (
          <Pressable
            onPress={() => {
              if (onPress) onPress(title);
              setFocused(title);
            }}
          >
            <Horizontal
              style={{
                paddingVertical: 15,
                paddingHorizontal: 20,
                borderBottomColor: isFocused(title) ? colors.primary : null,
                borderBottomWidth: isFocused(title) ? 1.5 : 0,
              }}
              key={idx}
            >
              {iconName ? (
                <Ionicons
                  name={iconName}
                  size={24}
                  color={isFocused(title) ? colors.primary : 'black'}
                />
              ) : null}
              {title ? (
                <H3 style={{ color: isFocused(title) ? colors.primary : 'black' }}>{title}</H3>
              ) : null}
            </Horizontal>
          </Pressable>
        );
      })}
    </Horizontal>
  );
};

export default TopTab;
