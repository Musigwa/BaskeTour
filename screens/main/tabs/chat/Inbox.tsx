import { AntDesign, Feather, FontAwesome } from '@expo/vector-icons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import moment from 'moment';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Image,
  ImageBackground,
  Keyboard,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import SearchPaginated from '../../../../components/common/Lists/SearchPaginated';
import useSocketIO from '../../../../hooks/socketIO';
import { useAppSelector } from '../../../../hooks/useStore';
import { useGetMyGroupsQuery } from '../../../../store/api-queries/group-queries';
import { H5, H6, Horizontal } from '../../../../styles/styled-elements';
import { createFormData, ellipsizeText } from '../../../../utils/methods';

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
        <View style={{ marginTop: isMe ? 0 : 5 }}>
          {item.fileUrl ? (
            <Image
              style={{ width: 270, height: 150, borderRadius: 10 }}
              source={{ uri: item?.fileUrl }}
            />
          ) : null}
          <Horizontal style={{ marginVertical: 5 }}>
            <H5 style={[styles.message, { marginRight: 10 }]}>{item.message}</H5>
            <H6 style={[styles.timestamp]}>{moment(item.createdAt).format('LT')}</H6>
          </Horizontal>
        </View>
      </View>
    </Horizontal>
  );
};

const InboxScreen = ({ route }: any) => {
  const { colors } = useTheme();
  const { chat } = route.params ?? {};
  const [text, setText] = useState('');
  const [photo, setPhoto] = useState<any>({});

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
    const fileUrl = photo?.uri ?? undefined;
    const newMessage = { message, sender: user, group: chat.group, createdAt, fileUrl };
    setMessages(state => [...state, newMessage]);
    const body = createFormData(photo, { message, createdAt: newMessage.createdAt }, 'messageFile');
    fetch(`https://api.ullipicks.com/api/v1/group-chat/${chat.group.id}/messages`, {
      body,
      headers: { 'x-auth-token': `Bearer ${token}`, 'Content-Type': 'application/json' },
      method: 'post',
    })
      .then(resp => resp.json())
      .then(restPhoto);
    inputRef?.current?.clear?.();
  };

  const restPhoto = () => {
    setPhoto(null);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [9, 5],
      quality: 1,
    });
    if (!result.cancelled) setPhoto(result);
  };

  return (
    <View
      style={Platform.select({ ios: { flex: 1, bottom: keyboardHeight }, android: { flex: 1 } })}
    >
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
      <View style={{ width: '100%' }}>
        {photo?.uri ? (
          <ImageBackground
            style={{
              width: '100%',
              height: 250,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
            }}
            source={{ uri: photo.uri }}
            resizeMethod='scale'
          >
            <View
              style={{
                height: '100%',
                width: '100%',
                backgroundColor: 'rgba(0,0,0,0.2)',
                alignItems: 'flex-end',
              }}
            >
              <AntDesign
                name='close'
                size={24}
                color='white'
                onPress={setPhoto}
                style={{ padding: 10 }}
              />
            </View>
          </ImageBackground>
        ) : null}
        <Horizontal style={[styles.inputContainer]}>
          {photo.uri ? null : (
            <Pressable style={styles.inputBtnContainer} onPress={pickImage}>
              <Feather name='paperclip' size={24} color='gray' />
            </Pressable>
          )}
          <TextInput
            style={[styles.input, { marginLeft: photo.uri ? 10 : 0 }]}
            placeholder={`${photo.uri ? 'Add you caption' : 'Write your message'}...`}
            onChangeText={setText}
            numberOfLines={3}
            ref={inputRef}
            autoCorrect={false}
            returnKeyType='send'
            returnKeyLabel='Send'
            onSubmitEditing={handleSendMessage}
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
    </View>
  );
};

export default InboxScreen;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 15 },
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
