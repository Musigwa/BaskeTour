import { useTheme } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { H2, H4, H6, Horizontal, Separator } from '../../../../styles/styled-elements';
import SearchPaginated from '../../../../components/common/Lists/SearchPaginated';
import { useGetMyGroupsQuery } from '../../../../store/api-queries/group-queries';

const renderItem = ({ item, index: idx, navigation, colors }) => {
  return (
    <View style={styles.container} key={idx}>
      <Horizontal style={styles.listItem}>
        <Horizontal style={{ flex: 0.6 }}>
          <View style={[styles.avatarContainer, { backgroundColor: colors.primary }]}>
            <H2 style={styles.avatar}>D</H2>
          </View>
          <View>
            <H4>Best Five Group</H4>
            <H6 style={{ color: colors.gray, marginTop: 5 }}>Hey Guys!</H6>
          </View>
        </Horizontal>
        <View style={{ alignItems: 'flex-end' }}>
          <H4 style={{ textTransform: 'uppercase', color: colors.gray }}>11:00 AM</H4>
          <View style={[styles.badge, { backgroundColor: colors.primary }]}>
            <H6 style={{ textAlign: 'center', color: 'white' }}>12</H6>
          </View>
        </View>
      </Horizontal>
      <Separator />
    </View>
  );
};

const ChatListScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <SearchPaginated
      style={{ backgroundColor: 'white' }}
      data={Array(20).fill(null)}
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
