import { Feather, FontAwesome } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { Image, Pressable, StyleSheet, TextInput, View } from 'react-native';
import SearchPaginated from '../../../../components/common/Lists/SearchPaginated';
import { useGetMyGroupsQuery } from '../../../../store/api-queries/group-queries';
import { H5, H6, Horizontal } from '../../../../styles/styled-elements';
import { genColor } from '../../../../utils/methods';

const renderItem = ({ item, index, colors }) => {
  const isMe = item?.sender?.id === '43f23vc1233432341544';
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
            {item.sender.firstName} {item.sender.lastName}
          </H5>
        )}
        <Horizontal>
          <H5 style={[styles.message, { marginTop: isMe ? 0 : 10 }]}>
            {item.message.slice(0, Math.floor(Math.random() * 1000))}
          </H5>
          <H6 style={[styles.timestamp]}>{item.timestamp}</H6>
        </Horizontal>
      </View>
    </Horizontal>
  );
};

const InboxScreen = ({ route }) => {
  const { colors } = useTheme();
  const { chat } = route.params ?? {};
  const [text, setText] = useState('');
  const textMode = useMemo(() => text.length, [text]);

  return (
    <View style={{ flex: 1 }}>
      <SearchPaginated
        data={chat}
        renderItem={args => renderItem({ ...args, colors })}
        fetchMethod={useGetMyGroupsQuery}
        style={styles.container}
        searchable={false}
      />
      <Horizontal style={styles.inputContainer}>
        <Pressable style={styles.inputBtnContainer}>
          <Feather name='paperclip' size={24} color='gray' />
        </Pressable>
        <TextInput
          style={styles.input}
          placeholder='Write your message...'
          onChangeText={setText}
          numberOfLines={3}
        />
        <Horizontal>
          <Pressable style={styles.inputBtnContainer}>
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
  bubble: { padding: 12, marginVertical: 10, minWidth: '50%', maxWidth: '85%', borderRadius: 15 },
  senderName: { color: 'white', fontFamily: 'Poppins_700Bold' },
  message: { color: 'white', maxWidth: '75%' },
  timestamp: { color: 'white', alignSelf: 'flex-end', textTransform: 'uppercase' },
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
