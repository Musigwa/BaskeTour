import { Entypo } from '@expo/vector-icons';
import { useNavigation, useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useAppDispatch } from '../../../hooks/useStore';
import { logOut, completedOnboarding } from '../../../store/slices/authSlice';
import { H2, H4, Horizontal } from '../../../styles/styled-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { persistor } from '../../../store';

const options = [
  { title: 'Groups' },
  { title: 'Profile settings' },
  { title: 'Payment settings' },
  { title: 'Tutorial', screen: 'Slider' },
  { title: 'Detailed rules' },
  { title: 'Notifications' },
  { title: 'Change Password' },
  { title: 'Logout' },
];

const SettingsScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();

  const handlePress = async (element: { title: string; screen?: string }) => {
    if (element.title.includes('ogout')) {
      await persistor.flush();
      return dispatch(logOut());
    } else if (element.title.toLowerCase().includes('tutorial')) {
      await dispatch(completedOnboarding(false));
      navigation.navigate(element.screen);
    } else {
      const [screenName] = element.title.split(' ');
      navigation.navigate(element.screen ?? screenName);
    }
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
          style={{ flex: 1, marginBottom: 10, justifyContent: 'center' }}
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
    </View>
  );
};

export default SettingsScreen;
