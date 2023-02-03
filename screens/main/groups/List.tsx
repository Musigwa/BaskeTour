import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React, { FC, PropsWithChildren } from 'react';
import { Image, Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';
import SearchPaginated from '../../../components/common/Lists/SearchPaginated';
import { useAppSelector } from '../../../hooks/useStore';
import { useGetMyGroupsQuery } from '../../../store/api-queries/group-queries';
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
      <H6 style={{ color: group.availableSpots ? colors.gray : colors.primary }}>
        {`${group.players.length} member${group.players.length > 1 ? 's' : ''}${
          !group.availableSpots ? `, ${group.availableSpots} available spots` : ''
        }`}
      </H6>
      <Horizontal>
        <H3>{group.groupName}</H3>
        <Entypo name='chevron-small-right' size={24} color={'black'} />
      </Horizontal>
      <Horizontal style={{ justifyContent: 'flex-start', marginTop: 5 }}>
        {group.players.slice(0, showCount).map((player, idx) => {
          return (
            <View style={[styles.avatarContainer, { left: -(20 * idx) }]} key={idx}>
              {player.profilePic ? (
                <Image
                  source={{ uri: player.profilePic }}
                  style={[styles.image, { backgroundColor: colors.gray }]}
                  resizeMode='cover'
                />
              ) : (
                <View style={[styles.noImage, { borderColor: colors.gray }]}>
                  <MaterialIcons name='no-photography' size={24} color={colors.gray} />
                </View>
              )}
            </View>
          );
        })}
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
  const {
    myGroups,
    user: { id: userId },
  } = useAppSelector(({ auth: { user }, groups: { myGroups } }) => ({ user, myGroups }));
  const { colors } = useTheme();

  return (
    <SearchPaginated
      data={myGroups}
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
