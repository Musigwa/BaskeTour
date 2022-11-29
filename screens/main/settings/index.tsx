import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation, useTheme } from '@react-navigation/native';
import { H3, H4, Horizontal } from '../../../styles/styled-elements';
import { Entypo } from '@expo/vector-icons';
import { loggedOut } from '../../../store/slices/authSlice';
import { useAppDispatch } from '../../../hooks/useStore';

const options = [
  { title: 'Groups' },
  { title: 'Profile settings' },
  { title: 'Payment settings' },
  { title: 'Tutorial' },
  { title: 'Detailed rules' },
  { title: 'Notifications' },
  { title: 'Change Password' },
  { title: 'Logout' },
];

const SettingsScreen = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const handlePress = (element: { title: string }) => {
    if (element.title.includes('ogout')) dispatch(loggedOut());
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingBottom: 40,
        paddingTop: 30,
        paddingHorizontal: 20,
      }}
    >
      {options.map((item, idx) => (
        <TouchableOpacity
          key={idx}
          style={{ flex: 1 }}
          activeOpacity={0.7}
          onPress={() => handlePress(item)}
        >
          <Horizontal>
            <H4 style={{ color: options.length - 1 === idx ? colors.primary : 'black' }}>
              {item.title}
            </H4>
            <Entypo
              name='chevron-small-right'
              size={24}
              color={options.length - 1 === idx ? colors.primary : 'black'}
            />
          </Horizontal>
        </TouchableOpacity>
      ))}
      {/* <Button title='Go to Notification' onPress={() => navigation.navigate('Notifications')} /> */}
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});
