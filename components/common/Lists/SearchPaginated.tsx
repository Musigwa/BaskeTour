import { Feather, Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import _ from 'lodash';
import React, {
  FC,
  PropsWithChildren,
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { H5, Horizontal } from '../../../styles/styled-elements';

type SearchPaginatedProps = {
  searchable?: boolean;
  fetchQuery: Function;
  params: { [key: string]: any };
  ListFooterComponent: ReactElement;
  ListEmptyComponent?: ReactElement;
  renderItem: ListRenderItem<any>;
};

export const SearchPaginated: FC<PropsWithChildren<SearchPaginatedProps>> = ({
  searchable = true,
  fetchQuery,
  params,
  renderItem,
  ListFooterComponent,
  ListEmptyComponent = DefaultEmpty,
}) => {
  const { colors } = useTheme();
  const [searchQuery, setText] = useState<string>('');
  const searchInput = useRef(null);

  const { isFetching, refetch, data: { data = [] } = {} } = fetchQuery({ searchQuery, ...params });
  const handleDebTextChange = useMemo(() => _.debounce(setText, 300), []);

  useEffect(() => {
    refetch();
    return handleDebTextChange.cancel;
  }, [searchQuery]);

  const clearText = () => {
    setText('');
    searchInput.current?.clear?.();
  };

  return (
    <View style={styles.container}>
      {searchable ? (
        <Horizontal style={styles.inputWrapper}>
          <Feather name='search' size={20} color='black' />
          <TextInput
            ref={searchInput}
            style={[styles.input, { width: '82%' }]}
            onChangeText={handleDebTextChange}
            placeholder='Type to search...'
            autoCapitalize='none'
            autoComplete='off'
            autoCorrect={false}
            returnKeyType='search'
          />
          {isFetching ? (
            <ActivityIndicator size='small' color={colors.gray} />
          ) : searchQuery.length ? (
            <Ionicons name='close' size={20} color='gray' onPress={clearText} />
          ) : (
            <View style={{ width: 20 }} />
          )}
        </Horizontal>
      ) : null}
      <FlatList
        refreshing={isFetching}
        onRefresh={refetch}
        contentContainerStyle={{ flexGrow: 1 }}
        data={data}
        // ListHeaderComponent={<H5>Musigwa</H5>}
        onEndReachedThreshold={0.2}
        // onEndReached={fetchMoreData}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        ListFooterComponent={ListFooterComponent}
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
};

const DefaultEmpty = () => (
  <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
    <H5>No data matching your search to display!</H5>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: 'rgba(0,0,0,0.02)' },
  inputWrapper: {
    height: 48,
    backgroundColor: 'rgba(241, 243, 245, 1)',
    paddingHorizontal: 10,
    borderRadius: 6,
    marginBottom: 15,
    width: '100%',
  },
  input: { height: '100%', fontSize: 16, fontFamily: 'Poppins_500Medium' },
});

export default SearchPaginated;
