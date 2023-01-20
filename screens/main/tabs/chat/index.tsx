import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import SearchPaginated from '../../../../components/common/Lists/SearchPaginated';
import { chats } from '../../../../constants/dummy';
import { useGetMyGroupsQuery } from '../../../../store/api-queries/group-queries';
import {
  H3,
  H4,
  H6,
  Horizontal,
  Separator,
} from '../../../../styles/styled-elements';
import { ellipsizeText, genColor } from '../../../../utils/methods';
import moment from 'moment';
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
            <H6 style={{ color: colors.gray, marginTop: 5 }}>
              {ellipsizeText(chat.lastMessage, 30)}
            </H6>
          </View>
        </Horizontal>
        <View style={{ alignItems: 'flex-end' }}>
          <H6 style={{ textTransform: 'uppercase', color: colors.gray }}>
            {moment().format('LT')}
          </H6>
          {!!chat.unreadMessages && (
            <View style={[styles.badge, { backgroundColor: colors.primary }]}>
              <H6 style={{ textAlign: 'center', color: 'white' }}>
                {chat.unreadMessages}
              </H6>
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
  const [conversations, setConversations] = useState([]);
  const groupedChats = Object.values(
    chats.reduce((acc, next) => {
      const { group } = next;
      acc[group.groupName] = acc[group.groupName] ?? [];
      acc[group.groupName].push(next);
      return acc;
    }, {})
  );

  useEffect(() => {
    if (groupedChats.length === 1) {
      const [chat] = groupedChats;
      navigation.navigate('Inbox', { chat });
    }
  }, []);

  useEffect(() => {
    fetch('https://api.ullipicks.com/api/v1/group-chat/conversations', {
      headers: {
        'x-auth-token':
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNTEyYjZmOWU2OWQ2MzMyMGY4ZTFjZCIsImlhdCI6MTY3NDIwNzM2MSwiZXhwIjoxNjc2Nzk5MzYxfQ.iekRjRcvOJc2rKnHP7OyPWA2wMrALtOaZRopy0Avt0Y',
      },
    })
      .then((response) => response.json())
      .then((result) => setConversations(result.data));
  }, []);

  return (
    <SearchPaginated
      style={{ backgroundColor: 'white' }}
      data={conversations}
      fetchMethod={useGetMyGroupsQuery}
      renderItem={(args) => renderItem({ ...args, navigation, colors })}
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
