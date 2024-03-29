import { Entypo } from '@expo/vector-icons';
import { useIsFocused, useTheme } from '@react-navigation/native';
import React, { FC, PropsWithChildren, useState } from 'react';
import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import RenderAvatar from '../../../components/common/Avatar';
import SearchPaginated from '../../../components/common/Lists/SearchPaginated';
import { useGetMyGroupsQuery } from '../../../store/queries/group';
import { H3, H5, H6, Horizontal } from '../../../styles/styled-elements';

const ListFooterComponent = ({ navigation, colors }) => {
  return (
    <View style={{ marginVertical: 80 }}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        activeOpacity={0.9}
        onPress={() => navigation.navigate('CreateGroup')}
      >
        <H3 style={{ color: 'white' }}>Create Group</H3>
      </TouchableOpacity>
      <H5>
        The first 5 players in your group are provided for free. If more players want to join, the
        Group Admin can purchase additional spots for $2 per player.
      </H5>
    </View>
  );
};

type RenderItemProps = { item: any; index: any; colors: any; navigation: any };

const renderItem: FC<PropsWithChildren<RenderItemProps>> = ({
  item: group,
  index: idx,
  colors,
  navigation,
}) => {
  const showCount = 5;
  const { length } = group.players;
  const lastIdx = length < showCount ? length : showCount;
  return (
    <Pressable
      style={styles.card}
      key={idx}
      onPress={() => navigation.navigate('GroupDetails', { group })}
    >
      <H6 style={{ color: group?.availableSpots ? colors.gray : colors.primary }}>
        {`${group.players.length} member${group.players.length > 1 ? 's' : ''}${
          !group.availableSpots ? `, ${group?.availableSpots} available spots` : ''
        }`}
      </H6>
      <Horizontal>
        <H3>{group.groupName}</H3>
        <Entypo name='chevron-small-right' size={24} color={'black'} />
      </Horizontal>
      <Horizontal style={{ justifyContent: 'flex-start', marginTop: 5 }}>
        {group?.players?.length
          ? group?.players?.slice(0, showCount)?.map((player, idx) => {
              const label =
                player?.firstName && player?.lastName
                  ? `${player?.firstName.charAt(0)}${player?.lastName?.charAt(0)}`
                  : `${player?.email?.slice(0, 2)}`;
              return (
                <View style={[styles.avatarContainer, { left: -(20 * idx) }]} key={idx}>
                  <RenderAvatar uri={player?.profilePic} label={label} />
                </View>
              );
            })
          : null}
        {lastIdx !== length ? (
          <View style={[styles.extra, { backgroundColor: colors.gray, left: -(20 * lastIdx) }]}>
            <H3 style={{ color: 'white', fontWeight: 'bold' }}>+{length - showCount}</H3>
          </View>
        ) : null}
      </Horizontal>
    </Pressable>
  );
};

const GroupListScreen: FC<PropsWithChildren<{ navigation: any }>> = ({ navigation }) => {
  const { colors } = useTheme();
  const [myGroups, setMyGroups] = useState([]);
  const shouldRefetch = useIsFocused();

  return (
    <SearchPaginated
      data={myGroups}
      updateData={setMyGroups}
      shouldRefetch={shouldRefetch}
      fetchMethod={useGetMyGroupsQuery}
      ListFooterComponent={ListFooterComponent({ navigation, colors })}
      renderItem={args => renderItem({ ...args, navigation, colors })}
    />
  );
};

export default GroupListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: 'rgba(0,0,0,0.02)' },
  card: {
    width: '100%',
    borderRadius: 4,
    backgroundColor: 'white',
    marginBottom: 21,
    marginTop: 10,
    shadowColor: 'rgba(35, 20, 115, 0.08)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    paddingVertical: 15,
    paddingHorizontal: 24,
  },
  button: {
    paddingVertical: 17,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    marginBottom: 30,
  },
  extra: {
    width: 52,
    height: 52,
    borderRadius: 26,
    padding: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: { borderRadius: 30, backgroundColor: 'white', padding: 2 },
  image: { width: 50, height: 50, borderRadius: 25 },
  noImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
