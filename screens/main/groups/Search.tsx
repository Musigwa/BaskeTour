import { useNavigation, useNavigationState, useRoute, useTheme } from '@react-navigation/native';
import { FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import RadioButton from '../../../components/common/RadioButton';
import {
  Container,
  ErrorMessage,
  H3,
  ListItem,
  Title,
  View,
} from '../../../styles/styled-elements';

import React, { useEffect, useState } from 'react';

import { Formik } from 'formik';
import { debounce } from 'lodash';
import Input from '../../../components/common/Input';
import { useAppDispatch } from '../../../hooks/useStore';
import { IGroup } from '../../../interfaces';
import { useGetGroupsQuery } from '../../../store/api-queries/group-queries';
import { selectGroup } from '../../../store/slices/groupSlice';

type GroupSearchProps = {
  onSelect: (group: IGroup) => void;
  title?: string;
  msg404?: string;
  btnText?: string;
};

const SearchGroup = ({}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [skip, setSkip] = useState(true);
  const [selectedItem, setSelectedItem] = useState<IGroup>();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { params } = useRoute<{ params: GroupSearchProps } & any>();
  const navState = useNavigationState(state => state);

  const {
    title = 'Join Existing Group',
    confirmBtn = {},
    msg404 = 'Group does not exist. Contact your group admin',
  } = params ?? {};
  const { text = 'Confirm Selection' } = confirmBtn;

  const {
    data: groups,
    refetch,
    isError,
    error: err,
  } = useGetGroupsQuery({ searchQuery: searchQuery }, { skip });

  const debouncedUpdate = debounce(text => setSearchQuery(text), 300, {
    leading: true,
    trailing: false,
  });

  useEffect(() => {
    if (searchQuery.length) setSkip(false);
  }, [searchQuery]);

  const handleSelect = () => {
    dispatch(selectGroup(selectedItem));
    const { routes } = navigation.getState();
    const prevRoute = routes[routes.length - 2];
    navigation.navigate(prevRoute.name, { group: selectedItem });
  };

  return (
    <Container>
      <SafeAreaView style={{ alignItems: 'center' }}>
        <Title style={{ textTransform: 'capitalize' }}>{title}</Title>
        <Formik initialValues={{ searchQuery: '' }} onSubmit={refetch}>
          {({ handleChange, values }) => {
            debouncedUpdate(values.searchQuery);
            return (
              <View mb={40} mt={40}>
                <Input
                  placeholder='Type a group name to search...'
                  name='searchQuery'
                  required
                  handleChange={handleChange}
                  handleBlur={() => {}}
                />
              </View>
            );
          }}
        </Formik>
        <FlatList
          data={groups?.data ?? []}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({ item }: { item: IGroup }) => (
            <ListItem key={item.id}>
              <RadioButton
                selected={selectedItem?.id === item.id}
                color={colors.primary}
                text={item.groupName}
                onClick={text => setSelectedItem(item)}
              />
            </ListItem>
          )}
          ListFooterComponent={
            <View>
              <ErrorMessage>{isError && err ? JSON.stringify(err) : msg404}</ErrorMessage>
            </View>
          }
        />
        <TouchableOpacity
          style={{
            backgroundColor: !!selectedItem ? colors.primary : '#CCCCCC',
            padding: 15,
            borderRadius: 10,
            marginTop: 10,
          }}
          onPress={handleSelect}
          disabled={!selectedItem}
        >
          <H3 style={{ color: 'white' }}>{text}</H3>
        </TouchableOpacity>
      </SafeAreaView>
    </Container>
  );
};

export default SearchGroup;
