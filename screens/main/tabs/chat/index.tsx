import { useIsFocused, useTheme } from '@react-navigation/native';
import _ from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import SearchPaginated from '../../../../components/common/Lists/SearchPaginated';
import useSocketIO from '../../../../hooks/socketIO';
import { useAppSelector } from '../../../../hooks/useStore';
import { useGetConversationsQuery } from '../../../../store/queries/group';
import { H3, H4, H6, Horizontal, Separator } from '../../../../styles/styled-elements';
import { ellipsizeText, genColor } from '../../../../utils/methods';

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
            <H3 style={styles.avatar}>{chat?.group?.groupName.slice(0, 2)}</H3>
          </View>
          <View style={{ flex: 0.9 }}>
            <H4>{ellipsizeText(chat?.group?.groupName, 20)}</H4>
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
  const { user } = useAppSelector(({ auth }) => auth);
  const [conversations, setConversations] = useState([]);
  const shouldRefetch = useIsFocused();

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

  const handleNGMessage = (message: any) => {
    setConversations(prev => {
      let found;
      found = prev.find(c => c?.group?.id === message.group.id);
      const without = _.without(prev, found);
      found = { ...found, lastMessage: message };
      if (user?.id !== message.sender.id)
        found = { ...found, unreadMessages: (found.unreadMessages ?? 0) + 1 };
      return [found, ...without] as never[];
    });
  };

  return (
    <SearchPaginated
      style={{ backgroundColor: 'white' }}
      data={conversations}
      updateData={setConversations}
      shouldRefetch={shouldRefetch}
      fetchMethod={useGetConversationsQuery}
      renderItem={args => renderItem({ ...args, navigation, colors })}
    />
  );
};

export default ChatListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },
  listItem: { width: '100%', backgroundColor: 'white', paddingVertical: 20 },
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
