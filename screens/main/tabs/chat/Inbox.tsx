import { Feather, FontAwesome } from '@expo/vector-icons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Image, Keyboard, Pressable, StyleSheet, TextInput, View } from 'react-native';
import SearchPaginated from '../../../../components/common/Lists/SearchPaginated';
import useSocketIO from '../../../../hooks/socketIO';
import { useAppSelector } from '../../../../hooks/useStore';
import { groupApi, useGetMyGroupsQuery } from '../../../../store/api-queries/group-queries';
import { H5, H6, Horizontal } from '../../../../styles/styled-elements';
import { ellipsizeText } from '../../../../utils/methods';

const renderItem = ({ item, index, colors, user }) => {
  const isMe = item?.sender?.id === user?.id;
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

const InboxScreen = ({ route }: any) => {
  const { colors } = useTheme();
  const { chat } = route.params ?? {};
  const [text, setText] = useState('');
  const inputRef = useRef(null);
  const message = useMemo(() => text.trim(), [text]);
  const { user, token } = useAppSelector(({ auth }) => auth);
  const [messages, setMessages] = useState<any[]>([]);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const socket = useSocketIO();
  const tabBarHeight = useBottomTabBarHeight();

  const handleUnMount = () => {
    clearUnreadStatus();
    socket.off('NEW_GROUP_MESSAGE');
  };

  const clearUnreadStatus = () => {
    fetch(`https://api.ullipicks.com/api/v1/group-chat/${chat.group.id}/view-messages`, {
      headers: { 'x-auth-token': `Bearer ${token}`, 'Content-Type': 'application/json' },
      method: 'patch',
    }).then(response => {});
  };

  const handleNGMessage = (message: any) => {
    if (user?.id !== message.sender.id && chat.group.id === message.group.id) {
      setMessages(prev => [...prev, message]);
    }
    clearUnreadStatus();
  };

  const keyboardWillShow = ({ endCoordinates }) => {
    setKeyboardHeight(endCoordinates.height - tabBarHeight);
  };

  const keyboardWillHide = () => {
    setKeyboardHeight(0);
  };

  useEffect(() => {
    const showListener = Keyboard.addListener('keyboardWillShow', keyboardWillShow);
    const hideListener = Keyboard.addListener('keyboardWillHide', keyboardWillHide);
    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  useEffect(() => {
    clearUnreadStatus();
    socket.on('NEW_GROUP_MESSAGE', handleNGMessage);
    fetch(`https://api.ullipicks.com/api/v1/group-chat/${chat.group.id}/messages`, {
      headers: { 'x-auth-token': `Bearer ${token}`, 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(result => {
        setMessages(result.data);
      });
    return handleUnMount;
  }, []);

  const handleSendMessage = () => {
    if (!text.length) return;
    setText('');
    const createdAt = new Date().toISOString();
    const newMessage = { message, sender: user, group: chat.group, createdAt };
    inputRef?.current?.clear?.();
    setMessages(state => [...state, newMessage]);
    fetch(`https://api.ullipicks.com/api/v1/group-chat/${chat.group.id}/messages`, {
      body: JSON.stringify({ message, createdAt: newMessage.createdAt }),
      headers: { 'x-auth-token': `Bearer ${token}`, 'Content-Type': 'application/json' },
      method: 'post',
    })
      .then(resp => resp.json())
      .then(result => {});
  };

  return (
    <View style={{ flex: 1 }}>
      <SearchPaginated
        data={messages.sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )}
        renderItem={args => renderItem({ ...args, colors, user })}
        fetchMethod={useGetMyGroupsQuery}
        style={styles.container}
        searchable={false}
        scrollOnContentChange
        paginatable={false}
      />
      <Horizontal style={[styles.inputContainer, { bottom: keyboardHeight }]}>
        <Pressable style={styles.inputBtnContainer}>
          <Feather name='paperclip' size={24} color='gray' />
        </Pressable>
        <TextInput
          style={styles.input}
          placeholder='Write your message...'
          onChangeText={setText}
          numberOfLines={3}
          ref={inputRef}
          autoCorrect={false}
          returnKeyType='send'
          returnKeyLabel='Send'
          onSubmitEditing={handleSendMessage}
          autoFocus
        />
        <Horizontal>
          <Pressable
            style={styles.inputBtnContainer}
            onPress={handleSendMessage}
            disabled={!message}
          >
            <FontAwesome
              name='send-o'
              size={24}
              color={message ? colors.primary : colors.disabled}
            />
          </Pressable>
        </Horizontal>
      </Horizontal>
    </View>
  );
};

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
