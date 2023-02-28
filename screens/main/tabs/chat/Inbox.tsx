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
import { Avatar } from 'react-native-paper';
import SearchPaginated from '../../../../components/common/Lists/SearchPaginated';
import useSocketIO from '../../../../hooks/socketIO';
import { useAppSelector } from '../../../../hooks/useStore';
import {
  useClearUnreadStatusMutation,
  useGetGroupChatsQuery,
  useSendGroupMessageMutation,
} from '../../../../store/queries/group';
import { H5, H6, Horizontal } from '../../../../styles/styled-elements';
import { createFormData, ellipsizeText } from '../../../../utils/methods';
import PhotoModal from './Photo';

const renderItem = ({ item, index, colors, user, onMessagePress }) => {
  const isMe = item?.sender?.id === user?.id;
  return (
    <Horizontal style={{ alignSelf: isMe ? 'flex-end' : 'flex-start' }} key={index}>
      {isMe ? null : (
        <Avatar.Image
          style={[styles.avatar]}
          size={50}
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
            <Pressable onPress={() => onMessagePress(item)}>
              <Image style={{ width: 270, height: 150 }} source={{ uri: item?.fileUrl }} />
            </Pressable>
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
  const [photo, setPhoto] = useState<{ [key: string]: any }>({});

  const inputRef = useRef(null);
  const message = useMemo(() => text.trim(), [text]);
  const { user } = useAppSelector(({ auth }) => auth);
  const [messages, setMessages] = useState<any[]>([]);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const socket = useSocketIO();
  const tabBarHeight = useBottomTabBarHeight();
  const [modalVisible, setModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>('');

  const [requestMessageSend] = useSendGroupMessageMutation();
  const [requestClearUnreadStatus] = useClearUnreadStatusMutation();

  const handleUnMount = () => {
    clearUnreadStatus();
    socket.off('NEW_GROUP_MESSAGE');
  };

  const clearUnreadStatus = async () => {
    try {
      await requestClearUnreadStatus({ groupId: chat?.group.id });
    } catch (error) {
      console.log('error', error);
    }
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
    return handleUnMount;
  }, []);

  const handleSendMessage = async () => {
    if (!canSend) return;
    try {
      setText('');
      resetPhoto();
      const createdAt = new Date().toISOString();
      const fileUrl = photo?.uri ?? null;
      const newMessage = { message, createdAt };
      const newMessageMeta = { ...newMessage, sender: user, group: chat.group, fileUrl };
      setMessages(state => [...state, { ...newMessage, ...newMessageMeta }]);
      inputRef?.current?.clear?.();
      const formData = createFormData(photo, newMessage, 'messageFile');
      const body = photo.uri ? formData : newMessage;
      await requestMessageSend({ body, groupId: chat.group.id }).unwrap();
    } catch (error) {
      console.log('error', error);
    }
  };

  const resetPhoto = () => setPhoto({});
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      aspect: [9, 5],
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    if (!result.cancelled) setPhoto(result);
  };

  const handleMessagePress = item => {
    setImageUrl(item.fileUrl);
    showModal();
  };

  const canSend = useMemo(() => message.length > 0 || photo?.uri, [message, photo?.uri]);

  return (
    <View
      style={Platform.select({ ios: { flex: 1, bottom: keyboardHeight }, android: { flex: 1 } })}
    >
      <PhotoModal visible={modalVisible} hideModal={hideModal} imageUrl={imageUrl} />
      <SearchPaginated
        data={[...messages].sort(
          (a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )}
        renderItem={args =>
          renderItem({ ...args, colors, user, onMessagePress: handleMessagePress })
        }
        fetchMethod={useGetGroupChatsQuery}
        params={{ groupId: chat.group.id }}
        updateData={setMessages}
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
                onPress={resetPhoto}
                style={{ padding: 10 }}
              />
            </View>
          </ImageBackground>
        ) : null}
        <Horizontal style={[styles.inputContainer]}>
          {photo?.uri ? null : (
            <Pressable style={styles.inputBtnContainer} onPress={pickImage}>
              <Feather name='paperclip' size={24} color='gray' />
            </Pressable>
          )}
          <TextInput
            style={[styles.input, { marginLeft: photo?.uri ? 10 : 0 }]}
            placeholder={`${photo?.uri ? 'Add you caption' : 'Write your message'}...`}
            placeholderTextColor={colors.gray}
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
              disabled={!canSend}
            >
              <FontAwesome
                name='send-o'
                size={24}
                color={canSend ? colors.primary : colors.disabled}
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
  avatar: { alignSelf: 'flex-end', marginRight: 5 },
  bubble: { padding: 12, marginVertical: 10, minWidth: '50%', maxWidth: '85%', borderRadius: 15 },
  senderName: { color: 'white', fontFamily: 'Poppins_700Bold' },
  message: { color: 'white', maxWidth: '75%', textTransform: 'none' },
  timestamp: { color: 'white', alignSelf: 'flex-end', textTransform: 'uppercase' },
  inputContainer: { backgroundColor: 'rgba(241, 243, 245, 1)', padding: 5 },
  input: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins_500Medium',
    flex: 0.9,
    height: '100%',
  },
  inputBtnContainer: { padding: 10, borderRadius: 30, backgroundColor: 'transparent' },
});
