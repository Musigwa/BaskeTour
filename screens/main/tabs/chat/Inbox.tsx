import { Feather, FontAwesome } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { Image, Pressable, StyleSheet, TextInput, View } from 'react-native';
import SearchPaginated from '../../../../components/common/Lists/SearchPaginated';
import useSocketIO from '../../../../hooks/socketIO';
import { useAppSelector } from '../../../../hooks/useStore';
import { useGetMyGroupsQuery } from '../../../../store/api-queries/group-queries';
import { H5, H6, Horizontal } from '../../../../styles/styled-elements';
import { ellipsizeText } from '../../../../utils/methods';

const renderItem = ({ item, index, colors, user }) => {
  const isMe = item?.sender?.id === user?.id;
  // const color = genColor({ type: 'shade' });

  return (
    <Horizontal style={{ alignSelf: isMe ? 'flex-end' : 'flex-start' }} key={index}>
      {isMe ? null : (
        <Image
          style={[styles.avatar, { backgroundColor: colors.gray }]}
          source={item?.sender?.profilePic ? { uri: item?.sender?.profilePic } : {}}
        />
      )}
      <View
        style={[
          styles.bubble,
          {
            backgroundColor: isMe ? colors.primary : colors.violet,
            borderBottomLeftRadius: isMe ? 15 : 0,
            borderBottomRightRadius: isMe ? 0 : 15,
          },
        ]}
      >
        {isMe ? null : (
          <H5 style={[styles.senderName]}>
            {ellipsizeText(`${item.sender.firstName} ${item.sender.lastName}`, 12)}
          </H5>
        )}
        <Horizontal style={{ marginTop: isMe ? 0 : 10 }}>
          <H5 style={[styles.message, { marginRight: 10 }]}>{item.message}</H5>
          <H6 style={[styles.timestamp]}>{moment(item.createdAt).format('LT')}</H6>
        </Horizontal>
      </View>
    </Horizontal>
  );
};

const InboxScreen = memo(({ route }: any) => {
  const { colors } = useTheme();
  const { chat } = route.params ?? {};
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);
  const textMode = useMemo(() => message.length, [message]);
  const { user, token } = useAppSelector(({ auth }) => auth);
  const [messages, setMessages] = useState<any[]>([]);
  const socket = useSocketIO();

  useEffect(() => {
    socket.emit('JOIN_GROUP', chat.group.id);
    socket.on('NEW_GROUP_MESSAGE', (message: any) => {
      if (user?.id !== message.sender.id) {
        setMessages(prev => [...prev, message]);
      }
    });
  }, []);

  useEffect(() => {
    fetch(`https://api.ullipicks.com/api/v1/group-chat/${chat.group.id}/messages`, {
      headers: {
        'x-auth-token': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(result => setMessages(result.data));
  }, []);

  const handleSendMessage = () => {
    setMessage('');
    const createdAt = new Date().toISOString();
    const newMessage = { message, sender: user, group: chat.group, createdAt };
    inputRef?.current?.clear?.();
    setMessages(state => [...state, newMessage]);
    axios
      .post(
        `https://api.ullipicks.com/api/v1/group-chat/${chat.group.id}/messages`,
        { message, createdAt: newMessage.createdAt },
        { headers: { 'x-auth-token': `Bearer ${token}` } }
      )
      .then(({ data: { data } }) => {
        socket.emit('SEND_GROUP_MESSAGE', { ...data, groupId: chat.group.id });
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <SearchPaginated
        data={_.sortBy(messages, ['createdAt'])}
        renderItem={args => renderItem({ ...args, colors, user })}
        fetchMethod={useGetMyGroupsQuery}
        style={styles.container}
        searchable={false}
        scrollOnContentChange
        paginatable={false}
      />
      <Horizontal style={styles.inputContainer}>
        <Pressable style={styles.inputBtnContainer}>
          <Feather name='paperclip' size={24} color='gray' />
        </Pressable>
        <TextInput
          style={styles.input}
          placeholder='Write your message...'
          onChangeText={setMessage}
          numberOfLines={3}
          ref={inputRef}
          autoCorrect={false}
        />
        <Horizontal>
          <Pressable
            style={styles.inputBtnContainer}
            onPress={handleSendMessage}
            disabled={!message}
          >
            <FontAwesome
              name={textMode ? 'send-o' : 'microphone'}
              size={24}
              color={colors.primary}
            />
          </Pressable>
        </Horizontal>
      </Horizontal>
    </View>
  );
});

export default InboxScreen;

const styles = StyleSheet.create({
  container: { paddingVertical: 30, paddingHorizontal: 15 },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
    alignSelf: 'flex-end',
    marginRight: 5,
  },
  bubble: {
    padding: 12,
    marginVertical: 10,
    minWidth: '50%',
    maxWidth: '85%',
    borderRadius: 15,
  },
  senderName: { color: 'white', fontFamily: 'Poppins_700Bold' },
  message: { color: 'white', maxWidth: '75%', textTransform: 'none' },
  timestamp: {
    color: 'white',
    alignSelf: 'flex-end',
    textTransform: 'uppercase',
  },
  inputContainer: { backgroundColor: 'rgba(241, 243, 245, 1)', padding: 5 },
  input: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins_500Medium',
    flex: 0.9,
    height: '100%',
  },
  inputBtnContainer: {
    padding: 10,
    borderRadius: 30,
    backgroundColor: 'transparent',
  },
});
