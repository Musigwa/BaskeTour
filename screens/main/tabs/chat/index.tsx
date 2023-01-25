import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import SearchPaginated from '../../../../components/common/Lists/SearchPaginated';
import { chats } from '../../../../constants/dummy';
import { useGetMyGroupsQuery } from '../../../../store/api-queries/group-queries';
import { H3, H4, H6, Horizontal, Separator } from '../../../../styles/styled-elements';
import { ellipsizeText, genColor } from '../../../../utils/methods';
import moment from 'moment';
import useSocketIO from '../../../../hooks/socketIO';
import _ from 'lodash';
import { useAppSelector } from '../../../../hooks/useStore';

const renderItem = ({ item: chat, index: idx, navigation, colors }) => {
  const handleItemPress = () => {
    navigation.navigate('Inbox', { chat });
  };

  return (
    <Pressable style={styles.container} key={idx} onPress={handleItemPress}>
      <Horizontal style={styles.listItem}>
        <Horizontal style={{ flex: 0.96 }}>
          <View
            style={[
              styles.avatarContainer,
              { backgroundColor: genColor({ type: 'shade' }).toString() },
            ]}
          >
            <H3 style={styles.avatar}>{chat.group?.groupName.slice(0, 2)}</H3>
          </View>
          <View style={{ flex: 0.9 }}>
            <H4>{ellipsizeText(chat.group?.groupName, 20)}</H4>
            <H6 style={{ color: colors.gray, marginTop: 5, textTransform: 'none' }}>
              {ellipsizeText(chat?.lastMessage?.message, 30)}
            </H6>
          </View>
        </Horizontal>
        <View style={{ alignItems: 'flex-end' }}>
          <H6 style={{ color: colors.gray, textTransform: 'none' }}>
            {chat?.lastMessage?.createdAt
              ? moment(chat?.lastMessage?.createdAt).format('LT')
              : null}
          </H6>
          {!!chat.unreadMessages && (
            <View style={[styles.badge, { backgroundColor: colors.primary }]}>
              <H6 style={{ textAlign: 'center', color: 'white' }}>{chat.unreadMessages}</H6>
            </View>
          )}
        </View>
      </Horizontal>
      <Separator />
    </Pressable>
  );
};

const ChatListScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const socket = useSocketIO();
  const { user, token } = useAppSelector(({ auth }) => auth);

  const [conversations, setConversations] = useState<any[]>([]);
  const groupedChats = Object.values(
    chats.reduce((acc, next) => {
      const { group } = next;
      acc[group.groupName] = acc[group.groupName] ?? [];
      acc[group.groupName].push(next);
      return acc;
    }, {})
  );

  useEffect(() => {
    if (conversations.length === 1) {
      const [chat] = conversations;
      navigation.navigate('Inbox', { chat });
    }
    socket.on('NEW_GROUP_MESSAGE', handleNGMessage);
    return () => {
      socket.off('NEW_GROUP_MESSAGE');
    };
  }, []);

  const fetchData = () => {
    return fetch('https://api.ullipicks.com/api/v1/group-chat/conversations', {
      headers: {
        'x-auth-token': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(result => {
        setConversations(result.data);
      });
  };

  const handleNGMessage = (message: any) => {
    setConversations(prev => {
      const found = prev.find(c => c?.group?.id === message.group.id) ?? {};
      const without = _.without(prev, found);
      found['lastMessage'] = message;
      if (user?.id !== message.sender.id) {
        found['unreadMessages'] = (found['unreadMessages'] ?? 0) + 1;
      }
      return [found, ...without];
    });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', fetchData);
    return unsubscribe;
  }, [navigation]);

  return (
    <SearchPaginated
      style={{ backgroundColor: 'white' }}
      data={conversations.sort(
        (a: any, b: any) =>
          new Date(b?.lastMessage?.createdAt).getTime() -
          new Date(a?.lastMessage?.createdAt).getTime()
      )}
      fetchMethod={useGetMyGroupsQuery}
      renderItem={args => renderItem({ ...args, navigation, colors })}
    />
  );
};

export default ChatListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },
  listItem: {
    width: '100%',
    backgroundColor: 'white',
    paddingVertical: 20,
  },
  avatarContainer: {
    height: 56,
    width: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: { textAlign: 'center', color: 'white' },
  badge: {
    borderRadius: 30,
    height: 20,
    minWidth: 20,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },
});
