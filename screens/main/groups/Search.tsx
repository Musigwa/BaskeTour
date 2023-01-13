import { useTheme } from '@react-navigation/native';
import { H3, H4, Horizontal, Separator } from '../../../styles/styled-elements';

import React from 'react';
import { Pressable } from 'react-native';
import SearchPaginated from '../../../components/common/Lists/SearchPaginated';
import { useAppDispatch, useAppSelector } from '../../../hooks/useStore';
import { useGetGroupsQuery } from '../../../store/api-queries/group-queries';
import { selectGroup } from '../../../store/slices/groupSlice';
import { ellipsizeText } from '../../../utils/methods';
import { StatusBar } from 'expo-status-bar';
import Container from '../../../components/common/Container';

const SearchGroup = ({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const { groups, user } = useAppSelector(({ groups: { groups }, auth: { user } }) => ({
    groups,
    user,
  }));

  const handleSelect = group => {
    dispatch(selectGroup(group));
    navigation.navigate('JoinGroup', { group });
  };

  return (
    <Container>
      <SearchPaginated
        fetchMethod={useGetGroupsQuery}
        data={groups}
        ItemSeparatorComponent={() => <Separator />}
        renderItem={({ index, item }) => {
          const disabled = item.players.find(p => user.id === p.id);
          return (
            <Horizontal style={{ width: '100%', paddingVertical: 20 }} key={index}>
              <H3>{ellipsizeText(item.groupName, 20)}</H3>
              <Pressable
                disabled={disabled}
                style={{
                  backgroundColor: disabled ? 'transparent' : 'rgba(255, 117, 91, 0.14)',
                  paddingVertical: 8,
                  paddingHorizontal: 20,
                  borderRadius: 5,
                }}
                onPress={() => handleSelect(item)}
              >
                <H4 style={{ color: colors.primary }}>{disabled ? 'Joined' : 'Join'}</H4>
              </Pressable>
            </Horizontal>
          );
        }}
      />
    </Container>
  );
};

export default SearchGroup;
