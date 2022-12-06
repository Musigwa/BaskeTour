import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { Pressable } from 'react-native';
import { H3, Horizontal } from '../../styles/styled-elements';

const TopTab = ({ tabs, onTabPress = (title: string) => {}, shadowVisible = true }) => {
  const [focused, setFocused] = useState(tabs[0].title);
  const { colors } = useTheme();

  const isFocused = title => title === focused;

  const handleTabPress = title => {
    setFocused(title);
    onTabPress(title);
  };

  return (
    <Horizontal>
      {tabs.map(({ iconName, title }, idx) => {
        return (
          <Pressable onPress={() => handleTabPress(title)} key={idx}>
            <Horizontal
              style={{
                paddingVertical: 15,
                paddingHorizontal: 20,
                borderBottomColor: shadowVisible && isFocused(title) ? colors.primary : null,
                borderBottomWidth: shadowVisible && isFocused(title) ? 1.5 : 0,
              }}
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
