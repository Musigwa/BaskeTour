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
import { ActivityIndicator, FlatList, ListRenderItem, StyleSheet, View } from 'react-native';
import { H4, Horizontal } from '../../../../styles/styled-elements';
import Searchbar from '../../Inputs/Searchbar';
import EmpytList from './EmpytList';

type SearchPaginatedProps = {
  searchable?: boolean;
  fetchMethod: Function;
  params?: { [key: string]: any };
  ListFooterComponent?: JSX.Element;
  ListEmptyComponent?: ReactElement;
  renderItem: ListRenderItem<any>;
  data: any[];
  searchKeyName?: string;
  perPageCountName?: string;
  itemsPerPage?: number;
};

type StateProps = { page: number; text: string };

export const SearchPaginated: FC<PropsWithChildren<SearchPaginatedProps>> = ({
  searchable = true,
  fetchMethod,
  params,
  renderItem,
  ListFooterComponent,
  ListEmptyComponent = EmpytList,
  data,
  searchKeyName = 'query',
  perPageCountName = 'perPage',
  itemsPerPage = 3,
}) => {
  const { colors } = useTheme();
  const [state, setState] = useState<StateProps>({ page: 1, text: '' });
  const { page, text } = state;
  const searchInput = useRef(null);

  const debCallback = text => {
    setState(() => ({ text, page: 1 }));
  };

  const {
    isFetching,
    refetch,
    data: { meta = {} } = {},
  } = fetchMethod({ [searchKeyName]: text, ...params, page, [perPageCountName]: itemsPerPage });
  const isListEnd = useMemo(() => meta.page === meta.totalPages, [meta.page, meta.totalPages]);
  const handleDebTextChange = useMemo(() => _.debounce(debCallback, 300), [isFetching]);

  useEffect(() => {
    refetch();
    return handleDebTextChange.cancel;
  }, [state]);

  const clearText = () => {
    setState(st => ({ ...st, text: '' }));
    searchInput.current?.clear?.();
  };

  const fetchMoreData = () => {
    if (!isListEnd && !isFetching) {
      setState(st => ({ ...st, page: page + 1 }));
    }
  };

  return (
    <View style={styles.container}>
      {searchable ? (
        <Searchbar
          clearText={clearText}
          handleTextChange={handleDebTextChange}
          isFetching={isFetching}
          text={text}
          ref={searchInput}
        />
      ) : null}
      <FlatList
        refreshing={isFetching}
        onRefresh={refetch}
        contentContainerStyle={{ flexGrow: 1 }}
        data={data}
        onEndReachedThreshold={1}
        initialNumToRender={itemsPerPage}
        onEndReached={fetchMoreData}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item, index) => `[${index}]${item?.id}`}
        ListFooterComponent={
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            {isListEnd && !isFetching && data.length ? (
              <H4 style={{ textTransform: 'normal' }}>End of list, no more data to fetch!</H4>
            ) : null}
            {isFetching && page > 1 ? (
              <Horizontal>
                <ActivityIndicator size='large' color={colors.gray} style={{ marginRight: 20 }} />
                <H4 styles={{ textAlign: 'right' }}>Fetching more items...</H4>
              </Horizontal>
            ) : null}
            {ListFooterComponent}
          </View>
        }
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: 'rgba(0,0,0,0.02)' },
});

export default SearchPaginated;
