import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React, { FC, PropsWithChildren, useCallback, useState } from 'react';
import { Pressable } from 'react-native';
import { H3, Horizontal } from '../../styles/styled-elements';

const TopTab: FC<
  PropsWithChildren<{ tabs: []; onTabPress?: Function; showVisible?: boolean } & any>
> = ({ tabs, onTabPress, shadowVisible = true, selected = '' }) => {
  const [focused, setFocused] = useState(selected || tabs[0].title);
  const { colors } = useTheme();

  const isFocused = useCallback(title => title === focused, [focused]);

  return (
    <Horizontal>
      {tabs.map((tab, idx) => {
        const { iconName, title } = tab;
        return (
          <Pressable
            onPress={() => {
              setFocused(tab.title);
              onTabPress?.(tab);
            }}
            key={idx}
          >
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
