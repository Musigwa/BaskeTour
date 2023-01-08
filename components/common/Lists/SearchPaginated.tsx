import { Feather, Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import _ from 'lodash';
import React, {
  FC,
  PropsWithChildren,
  ReactElement,
  ReactNode,
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
import { useAppSelector } from '../../../hooks/useStore';
import { H4, H5, Horizontal } from '../../../styles/styled-elements';

type SearchPaginatedProps = {
  searchable?: boolean;
  fetchQuery: Function;
  params?: { [key: string]: any };
  ListFooterComponent: ReactNode;
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
  const [page, setPage] = useState<number>(1);
  const searchInput = useRef(null);

  const debCallback = text => {
    setPage(1);
    setText(text);
  };
  const handleDebTextChange = useMemo(() => _.debounce(debCallback, 300), []);

  const {
    isFetching,
    refetch,
    data: { meta = {} } = {},
  } = fetchQuery({ searchQuery, page, perPage: params?.perPage ?? 5, ...params });
  const list = useAppSelector(({ groups }) => groups.myGroups);
  const isListEnd = useMemo(() => meta.page === meta.totalPages, [meta.page, meta.totalPages]);

  useEffect(() => {
    refetch();
    return handleDebTextChange.cancel;
  }, [searchQuery, page]);

  const clearText = () => {
    setText('');
    searchInput.current?.clear?.();
  };

  const fetchMoreData = () => {
    if (!isListEnd && !isFetching) {
      setPage(page + 1);
    }
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
        data={list}
        onEndReachedThreshold={0.2}
        onEndReached={fetchMoreData}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item, index) => `[${index}]${item?.id}`}
        ListFooterComponent={
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            {isListEnd && !isFetching && list.length ? (
              <H4 style={{ textTransform: 'normal' }}>End of list, no more data to fetch!</H4>
            ) : null}
            {isFetching ? <H4>Fetching more, please wait...</H4> : null}
            {ListFooterComponent}
          </View>
        }
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
