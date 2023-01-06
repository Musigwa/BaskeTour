import { Entypo, Feather, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import _ from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAppSelector } from '../../../hooks/useStore';
import { useGetMyGroupsQuery } from '../../../store/api-queries/group-queries';
import { H3, H5, H6, Horizontal } from '../../../styles/styled-elements';

export const GroupListScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const { id: userId } = useAppSelector(state => state.auth.user);
  const [searchQuery, setText] = useState<string>('');
  const {
    isFetching,
    refetch,
    data: { data: groups = [] } = {},
  } = useGetMyGroupsQuery({ searchQuery, userId });

  const handleDebTextChange = useMemo(() => _.debounce(setText, 300), []);

  useEffect(() => {
    refetch();
    return handleDebTextChange.cancel;
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <Horizontal style={styles.inputWrapper}>
        <Feather name='search' size={20} color='black' />
        <TextInput
          style={{ width: isFetching ? '89%' : '95%', height: '100%', paddingLeft: 10 }}
          onChangeText={handleDebTextChange}
        />
        {isFetching ? <ActivityIndicator size='small' color={colors.gray} /> : null}
      </Horizontal>
      {groups && groups.length
        ? groups?.map((group, idx) => {
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
                  {`${group.players.length} members${
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
                      <View
                        style={{
                          borderRadius: 30,
                          backgroundColor: 'white',
                          padding: 2,
                          left: -(20 * idx),
                        }}
                        key={idx}
                      >
                        <Image
                          source={{ uri: 'https://loremflickr.com/640/480' }}
                          // Todo: Replace this url with the player's profilePic
                          style={{ width: 50, height: 50, borderRadius: 25 }}
                          resizeMode='cover'
                        />
                      </View>
                    );
                  })}
                  {lastIdx !== length ? (
                    <View
                      style={[
                        styles.extra,
                        { backgroundColor: colors.gray, left: -(20 * lastIdx) },
                      ]}
                    >
                      <H3 style={{ color: 'white', fontWeight: 'bold' }}>+{length - showCount}</H3>
                    </View>
                  ) : null}
                </Horizontal>
              </Pressable>
            );
          })
        : null}
      <View style={{ marginTop: 150 }}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'rgba(0,0,0,0.02)',
  },
  inputWrapper: {
    height: 48,
    backgroundColor: 'rgba(241, 243, 245, 1)',
    paddingHorizontal: 15,
    borderRadius: 6,
  },
  card: {
    width: '100%',
    borderRadius: 4,
    backgroundColor: 'white',
    marginTop: 31,
    shadowColor: 'rgba(35, 20, 115, 0.08)',
    shadowOffset: {
      width: 0,
      height: 8,
    },
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
});

export default GroupListScreen;
