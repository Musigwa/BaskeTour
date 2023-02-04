import _ from 'lodash';
import React, { ComponentType, FC, memo, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  FlatListProps,
  ListRenderItem,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { H4, H5, Horizontal } from '../../../../styles/styled-elements';
import Searchbar from '../../Inputs/Searchbar';
import { useTheme } from 'react-native-paper';

type SearchPaginatedProps = FlatListProps<any> & {
  searchable?: boolean;
  fetchMethod: Function;
  params?: { [key: string]: any };
  ListEndComponent?: ComponentType;
  ListEmptyComponent?: ComponentType;
  ListLoadMoreComponent?: ComponentType;
  ItemSeparatorComponent?: ComponentType;
  ListFooterComponent?: JSX.Element;
  renderItem: ListRenderItem<any>;
  data: any[];
  searchKeyName?: string;
  perPageCountName?: string;
  itemsPerPage?: number;
  style?: ViewStyle;
  scrollOnContentChange?: boolean;
  paginatable?: boolean;
};

type StateProps = { page: number; text: string };

const DefaultEmptyComponent = () => (
  <H5 style={styles.empty}>No data matching your search to display!</H5>
);

const DefaultListEndComponent = () => (
  <H4 style={{ textTransform: 'none' }}>End of list, no more data to fetch!</H4>
);

const DefaultLoadMoreComponent = () => {
  const { colors } = useTheme();
  return (
    <Horizontal>
      <ActivityIndicator size='large' color={colors.gray} style={{ marginRight: 20 }} />
      <H4 styles={{ textAlign: 'right' }}>Fetching more items...</H4>
    </Horizontal>
  );
};

export const SearchPaginated: FC<SearchPaginatedProps> = memo(
  ({
    searchable = true,
    fetchMethod,
    params,
    renderItem,
    ListEndComponent = DefaultListEndComponent,
    ListEmptyComponent = DefaultEmptyComponent,
    ListLoadMoreComponent = DefaultLoadMoreComponent,
    ListFooterComponent,
    ItemSeparatorComponent,
    data,
    searchKeyName = 'searchQuery',
    perPageCountName = 'perPage',
    itemsPerPage = 12,
    style,
    scrollOnContentChange = false,
    paginatable = true,
    ...props
  }) => {
    const [state, setState] = useState<StateProps>({ page: 1, text: '' });
    const { page, text } = state;
    const searchInput = useRef(null);
    const listRef = useRef(null);
    const { colors } = useTheme();

    const debCallback = text => {
      setState({ text, page: 1 });
    };

    const {
      isFetching,
      refetch,
      data: { meta = {} } = {},
    } = fetchMethod({
      [searchKeyName]: text,
      ...params,
      page,
      [perPageCountName]: itemsPerPage,
    });
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

    const handleContentSizeChange = () => {
      if (scrollOnContentChange) {
        listRef.current?.scrollToEnd?.();
      }
    };

    return (
      <View style={[styles.container, style, { backgroundColor: colors.background }]}>
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
          ref={listRef}
          refreshing={isFetching}
          onRefresh={refetch}
          contentContainerStyle={{ flexGrow: 1, paddingVertical: 5 }}
          data={data}
          onEndReachedThreshold={1}
          initialNumToRender={5}
          onEndReached={paginatable ? fetchMoreData : undefined}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          ItemSeparatorComponent={ItemSeparatorComponent}
          keyExtractor={(item, index) => `[${index}]${item?.id}`}
          ListFooterComponent={
            <View style={styles.footerContainer}>
              {isListEnd && !isFetching && data.length ? <ListEndComponent /> : null}
              {isFetching && page > 1 ? <ListLoadMoreComponent /> : null}
              {ListFooterComponent}
            </View>
          }
          ListEmptyComponent={ListEmptyComponent}
          onContentSizeChange={handleContentSizeChange}
          onLayout={handleContentSizeChange}
          {...props}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: 'rgba(0,0,0,0.02)',
  },
  empty: { justifyContent: 'center', alignItems: 'center', marginTop: 50, textAlign: 'center' },
  footerContainer: { justifyContent: 'center', alignItems: 'center' },
});

export default SearchPaginated;
