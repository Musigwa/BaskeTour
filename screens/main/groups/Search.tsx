import { useTheme } from '@react-navigation/native';
import { H3, H4, Horizontal, Separator } from '../../../styles/styled-elements';

import React from 'react';
import { Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SearchPaginated from '../../../components/common/Lists/SearchPaginated';
import Container from '../../../components/common/containers/Container';
import { useAppDispatch, useAppSelector } from '../../../hooks/useStore';
import { useGetGroupsQuery } from '../../../store/queries/group';
import { selectGroup } from '../../../store/slices/group';
import { ellipsizeText } from '../../../utils/methods';

const SearchGroup = ({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useAppDispatch();
  const { groups, user } = useAppSelector(({ groups: { groups }, auth: { user } }) => ({
    groups,
    user,
  }));
  const { bottom, top } = useSafeAreaInsets();

  const handleSelect = group => {
    dispatch(selectGroup(group));
    navigation.navigate('JoinGroup', { group });
  };

  const renderItem = ({ index, item }) => {
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
  };

  return (
    <Container style={{ marginBottom: bottom }}>
      {
        <SearchPaginated
          fetchMethod={useGetGroupsQuery}
          data={groups}
          ItemSeparatorComponent={Separator}
          renderItem={renderItem}
          defaultBlank
        />
      }
    </Container>
  );
};

export default SearchGroup;
