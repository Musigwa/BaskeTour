import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import SearchPaginated from '../../../../components/common/Lists/SearchPaginated';
import { useGetMyGroupsQuery } from '../../../../store/api-queries/group-queries';
import { H5, H6, Horizontal } from '../../../../styles/styled-elements';
import { genColor } from '../../../../utils/methods';

const renderItem = ({ item, index, colors }) => {
  const isMe = item?.sender?.id === '43f23vc1233432341544';
  const color = genColor({ type: 'shade' });
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
            backgroundColor: isMe ? colors.primary : color,
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
  return (
    <SearchPaginated
      data={chat}
      renderItem={args => {
        return renderItem({ ...args, colors });
      }}
      fetchMethod={useGetMyGroupsQuery}
      style={styles.container}
      searchable={false}
    />
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
});
