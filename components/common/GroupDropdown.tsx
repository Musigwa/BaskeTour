import React, { useState } from 'react';
import { useGetUserGroupsQuery } from '../../store/api-queries/group-queries';
import { useAppDispatch, useAppSelector } from '../../hooks/useStore';
import { selectGroup } from '../../store/slices/groupSlice';
import { Pressable, View, ActivityIndicator } from 'react-native';
import { Menu, IconButton, Text } from 'react-native-paper';
import SearchPaginated from './Lists/SearchPaginated';

const GroupDropdown = () => {
  const dispatch = useAppDispatch();
  const { data } = useGetUserGroupsQuery();
  const { selectedGroup } = useAppSelector(({ groups }) => groups);
  const groupOptions = React.useMemo(() => {
    if (Array.isArray(data?.data)) {
      return data.data.map((item) => ({
        value: item.id,
        label: item.groupName,
      }));
    }
    return [];
  }, [data]);

  const handleSelect = (selectedItem) => () => {
    const _selectedGroup = data?.data.find((item) => item.id === selectedItem);
    dispatch(selectGroup(_selectedGroup));
    setOpen(false);
  };
  const [open, setOpen] = useState(false);

  const toggleMenu = () => setOpen((prev) => !prev);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      <Menu
        visible={open}
        onDismiss={() => setOpen(false)}
        contentStyle={{
          height: 500,
          overflow: 'scroll',
        }}
        anchor={
          <Pressable
            onPress={toggleMenu}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text style={{ textTransform: 'capitalize' }}>
              {selectedGroup?.groupName ?? 'Select group'}
            </Text>
            <IconButton
              icon={open ? 'chevron-up' : 'chevron-down'}
              size={20}
              style={{ marginRight: -10, paddingRight: 0 }}
            />
          </Pressable>
        }
      >
        <SearchPaginated
          data={groupOptions}
          fetchMethod={useGetUserGroupsQuery}
          searchable={false}
          renderItem={({ item }) => (
            <Menu.Item
              style={{
                flex: 1,
              }}
              key={item.value}
              onPress={handleSelect(item.value)}
              title={item.label}
              titleStyle={{
                color: selectedGroup?.groupName === item.label ? '#FF6F61' : '',
                textTransform: 'capitalize',
                marginRight: 10,
              }}
            />
          )}
          LoadMoreComponent={<ActivityIndicator size='large' />}
        />
      </Menu>
    </View>
  );
};

export default GroupDropdown;
