import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View } from 'react-native';
import { defaultScreenOptions } from '../../constants';
import { useAppSelector } from '../../hooks/useStore';
import ChatListScreen from '../../screens/main/tabs/chat';
import InboxScreen from '../../screens/main/tabs/chat/Inbox';
import { H4, H6 } from '../../styles/styled-elements';
import { ellipsizeText } from '../../utils/methods';

const Stack = createStackNavigator();

const ChatNavigator = ({ navigation }) => {
  const { colors } = useTheme();
  const myGroups = useAppSelector(({ groups }) => groups.myGroups);

  const goToSettings = () => {
    navigation.navigate('SettingList');
  };
  return (
    <Stack.Navigator
      screenOptions={{
        ...defaultScreenOptions,
        headerShadowVisible: true,
        headerRight: ({ tintColor }) => (
          <Ionicons
            name='settings'
            size={24}
            color={tintColor}
            style={{ marginRight: 20 }}
            onPress={goToSettings}
          />
        ),
      }}
      initialRouteName='ChatList'
    >
      <Stack.Screen
        name='ChatList'
        options={{ headerLeft: () => null, title: 'Chat' }}
        component={ChatListScreen}
      />
      <Stack.Screen
        name='Inbox'
        component={InboxScreen}
        options={({ route: { params } }) => ({
          headerTitle: ({ style, tintColor, ...props }) => {
            const group = params?.chat?.group;
            const fullGroup = myGroups.find((g) => g.id === group.id);
            return (
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <H4 {...props} style={{ color: tintColor }}>
                  {ellipsizeText(group.groupName, 18)}
                </H4>
                <H6 style={{ color: colors.gray }}>
                  {`${fullGroup?.players?.length} member${
                    Number(fullGroup?.players?.length) > 1 ? 's' : ''
                  }`}
                </H6>
              </View>
            );
          },
        })}
      />
    </Stack.Navigator>
  );
};

export default ChatNavigator;
