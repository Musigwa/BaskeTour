import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { H2, H4, H6, Horizontal, Separator } from '../../../../styles/styled-elements';
import SearchPaginated from '../../../../components/common/Lists/SearchPaginated';
import { useGetMyGroupsQuery } from '../../../../store/api-queries/group-queries';
import _ from 'lodash';
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
            <H2 style={styles.avatar}>{chat[0]?.group?.groupName.slice(0, 1)}</H2>
          </View>
          <View style={{ flex: 0.9 }}>
            <H4>{ellipsizeText(chat[0]?.group?.groupName, 20)}</H4>
            <H6 style={{ color: colors.gray, marginTop: 5 }}>
              {ellipsizeText(chat[0].message, 30)}
            </H6>
          </View>
        </Horizontal>
        <View style={{ alignItems: 'flex-end' }}>
          <H6 style={{ textTransform: 'uppercase', color: colors.gray }}>{chat[0].timestamp}</H6>
          <View style={[styles.badge, { backgroundColor: colors.primary }]}>
            <H6 style={{ textAlign: 'center', color: 'white' }}>12</H6>
          </View>
        </View>
      </Horizontal>
      <Separator />
    </Pressable>
  );
};

const ChatListScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const chats = [
    {
      message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      sender: {
        profilePic:
          'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/170.jpg',
        firstName: 'Jack',
        lastName: 'Beem',
        id: '43f23vc1233432341543',
      },
      group: {
        groupName: 'Best 5 Group',
        groupPIN: '1111',
        creator: '638a526dcaf71f35a8944335',
        extraPlayers: 0,
        createdAt: '2023-01-07T23:19:17.639Z',
        updatedAt: '2023-01-07T23:19:17.639Z',
        slug: 'beholder',
        id: '63b9fdf59aa4d902b625ee7b',
        availableSpots: 4,
      },
      timestamp: '11:53 AM',
    },
    {
      message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      sender: {
        profilePic:
          'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/170.jpg',
        firstName: 'Jack',
        lastName: 'Beem',
        id: '43f23vc1233432341544',
      },
      group: {
        groupName: 'Beholder',
        groupPIN: '1111',
        creator: '638a526dcaf71f35a8944335',
        extraPlayers: 0,
        createdAt: '2023-01-07T23:19:17.639Z',
        updatedAt: '2023-01-07T23:19:17.639Z',
        slug: 'beholder',
        id: '63b9fdf59aa4d902b625ee7b',
        availableSpots: 4,
      },
      timestamp: '11:53 AM',
    },
    {
      message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      sender: {
        profilePic:
          'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/170.jpg',
        firstName: 'Jack',
        lastName: 'Beem',
        id: '43f23vc1233432341543',
      },
      group: {
        groupName: 'December Test Tournament',
        groupPIN: '1221',
        creator: '637f5a6c2c9bc762219826f9',
        extraPlayers: 4,
        createdAt: '2022-12-22T14:43:41.067Z',
        updatedAt: '2022-12-22T14:43:41.067Z',
        slug: 'december-test-tournament',
        id: '63a46d1dee3a09d7cd175741',
        availableSpots: 0,
      },
      timestamp: '11:53 AM',
    },
    {
      message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      sender: {
        profilePic:
          'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/170.jpg',
        firstName: 'Jack',
        lastName: 'Beem',
        id: '43f23vc1233432341545',
      },
      group: {
        groupName: 'Fitz Fun',
        groupPIN: '1234',
        creator: '63a31acf2f0c4cb12f89e3f6',
        extraPlayers: 15,
        createdAt: '2022-12-22T14:48:02.601Z',
        updatedAt: '2022-12-22T14:48:02.601Z',
        slug: 'fitz-fun',
        id: '63a46e22ee3a09d7cd175783',
        availableSpots: 18,
      },
      timestamp: '11:53 AM',
    },
    {
      message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      sender: {
        profilePic:
          'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/170.jpg',
        firstName: 'Jack',
        lastName: 'Beem',
        id: '43f23vc1233432341543',
      },
      group: {
        groupName: 'Fitz Fun',
        groupPIN: '1234',
        creator: '63a31acf2f0c4cb12f89e3f6',
        extraPlayers: 15,
        createdAt: '2022-12-22T14:48:02.601Z',
        updatedAt: '2022-12-22T14:48:02.601Z',
        slug: 'fitz-fun',
        id: '63a46e22ee3a09d7cd175783',
        availableSpots: 18,
      },
      timestamp: '11:53 AM',
    },
    {
      message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      sender: {
        profilePic:
          'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/170.jpg',
        firstName: 'Jack',
        lastName: 'Beem',
        id: '43f23vc1233432341544',
      },
      group: {
        groupName: 'December Test Tournament',
        groupPIN: '1221',
        creator: '637f5a6c2c9bc762219826f9',
        extraPlayers: 4,
        createdAt: '2022-12-22T14:43:41.067Z',
        updatedAt: '2022-12-22T14:43:41.067Z',
        slug: 'december-test-tournament',
        id: '63a46d1dee3a09d7cd175741',
        availableSpots: 0,
      },
      timestamp: '11:53 AM',
    },
    {
      message: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
      sender: {
        profilePic:
          'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/170.jpg',
        firstName: 'Jack',
        lastName: 'Beem',
        id: '43f23vc1233432341546',
      },
      group: {
        groupName: 'December Test Tournament',
        groupPIN: '1221',
        creator: '637f5a6c2c9bc762219826f9',
        extraPlayers: 4,
        createdAt: '2022-12-22T14:43:41.067Z',
        updatedAt: '2022-12-22T14:43:41.067Z',
        slug: 'december-test-tournament',
        id: '63a46d1dee3a09d7cd175741',
        availableSpots: 0,
      },
      timestamp: '11:53 AM',
    },
  ];

  const groupChatsByGroup = chats.reduce((acc, next) => {
    const { group } = next;
    acc[group.groupName] = acc[group.groupName] ?? [];
    acc[group.groupName].push(next);
    return acc;
  }, {});

  return (
    <SearchPaginated
      style={{ backgroundColor: 'white' }}
      data={Object.values(groupChatsByGroup)}
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
    height: 50,
    width: 50,
    borderRadius: 25,
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
