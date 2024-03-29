import { AntDesign, Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useToast } from 'react-native-toast-notifications';
import { RULES } from '../../../constants';
import { useAppDispatch } from '../../../hooks/useStore';
import { persistor } from '../../../store';
import { useDeleteAccountMutation } from '../../../store/queries/auth';
import { completedOnboarding } from '../../../store/slices/auth';
import { H4, Horizontal } from '../../../styles/styled-elements';
import { actions } from '../../../types/api';
import { openBrowser } from '../../../utils/methods';

const options = [
  { title: 'Groups' },
  { title: 'Profile settings' },
  // { title: 'Payment settings' },
  { title: 'Tutorial', screen: 'Slider' },
  { title: 'Detailed rules' },
  { title: 'Notifications' },
  { title: 'Change Password', screen: 'PwdUpdate' },
  { title: 'Delete Account', dangerous: true },
  { title: 'Logout', dangerous: true },
];

const SettingsScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [requestAccountDeletion, { isLoading }] = useDeleteAccountMutation();

  const handleLogout = async () => {
    await persistor.flush();
    await AsyncStorage.clear();
    dispatch({ type: actions.LOGOUT });
  };

  const handleAccountDeletion = async () => {
    try {
      await requestAccountDeletion({}).unwrap();
      if (!isLoading) await handleLogout();
    } catch (error) {
      toast.show(error.data.message);
    }
  };

  const handlePress = async (element: { title: string; screen?: string; dangerous?: boolean }) => {
    let { title } = element;
    switch (title.toLowerCase()) {
      case 'logout':
        await handleLogout();
        break;
      case 'delete account':
        Alert.alert(
          'Deleting your account',
          'This is permanent and irreversible. Are you sure you want to continue?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Delete', onPress: handleAccountDeletion, style: 'destructive' },
          ]
        );
        break;
      case 'tutorial':
        dispatch(completedOnboarding(false));
        navigation.navigate(element.screen);
        break;
      case 'detailed rules':
        openBrowser(RULES);
        break;
      default:
        const [screenName] = element.title.split(' ');
        navigation.navigate(element.screen ?? screenName);
        break;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 20 }}>
      {options.map((item, idx) => {
        let { title, dangerous } = item;
        title = title.toLowerCase();
        return (
          <TouchableOpacity
            key={idx}
            activeOpacity={0.7}
            onPress={() => handlePress(item)}
            style={{ flex: 1 - 1 / options.length }}
          >
            <Horizontal>
              <H4 style={{ color: dangerous ? colors.primary : 'black' }}>{item.title}</H4>
              {dangerous ? (
                isLoading && title.includes('delete') ? (
                  <ActivityIndicator size='small' color={colors.primary} />
                ) : (
                  <AntDesign
                    name={
                      title.includes('logout')
                        ? 'logout'
                        : title.includes('delete')
                        ? 'deleteuser'
                        : 'question'
                    }
                    size={title.includes('logout') ? 20 : 24}
                    color={dangerous ? colors.primary : 'black'}
                  />
                )
              ) : (
                <Entypo
                  name='chevron-small-right'
                  size={24}
                  color={dangerous ? colors.primary : 'black'}
                />
              )}
            </Horizontal>
          </TouchableOpacity>
        );
      })}
    </SafeAreaView>
  );
};

export default SettingsScreen;
