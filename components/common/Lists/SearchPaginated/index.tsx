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
import Loading from '../../Loading';

type SearchPaginatedProps = FlatListProps<any> & {
  // Required properties
  renderItem: ListRenderItem<any>;
  data: any[];
  fetchMethod: Function;
  // Optional properties
  searchable?: boolean;
  params?: { [key: string]: any };
  ListEndComponent?: ComponentType;
  ListEmptyComponent?: ComponentType;
  ListLoadMoreComponent?: ComponentType;
  ItemSeparatorComponent?: ComponentType;
  ListFooterComponent?: JSX.Element;
  searchKeyName?: string;
  perPageCountName?: string;
  itemsPerPage?: number;
  style?: ViewStyle;
  scrollOnContentChange?: boolean;
  paginatable?: boolean;
  loadingMoreText?: string;
  emptyListText?: string;
  listEndText?: string;
};

type StateProps = { page: number; text: string };

const DefaultEmptyComponent: FC<{ text: string }> = ({ text }) => (
  <H5 style={styles.empty}>{text}</H5>
);

const DefaultListEndComponent: FC<{ text?: string }> = ({ text }) => (
  <H4 style={{ textTransform: 'none' }}>{text}</H4>
);

const DefaultLoadMoreComponent: FC<{ text?: string }> = ({ text }) => {
  const { colors } = useTheme();
  return (
    <Horizontal>
      <ActivityIndicator size='large' color={colors.gray} style={{ marginRight: 20 }} />
      <H4 styles={{ textAlign: 'right' }}>{text}</H4>
    </Horizontal>
  );
};

export const SearchPaginated: FC<SearchPaginatedProps> = memo(
  ({
    searchable = true,
    fetchMethod,
    params,
    renderItem,
    ListEndComponent,
    ListEmptyComponent,
    ListLoadMoreComponent,
    ListFooterComponent,
    ItemSeparatorComponent,
    data,
    searchKeyName = 'searchQuery',
    perPageCountName = 'perPage',
    itemsPerPage = 12,
    style,
    scrollOnContentChange = false,
    paginatable = true,
    loadingMoreText = 'Fetching more items...',
    emptyListText = 'No data matching your search to display!',
    listEndText = 'End of list, no more data to fetch!',
    ...props
  }) => {
    const [state, setState] = useState<StateProps>({ page: 1, text: '' });
    const { page, text } = state;
    const searchInput = useRef(null);
    const listRef = useRef(null);
    const { colors } = useTheme();

    const debCallback = text => setState({ text, page: 1 });

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
              {isListEnd && !isFetching && data.length ? (
                ListEndComponent ? (
                  <ListEndComponent />
                ) : (
                  <DefaultListEndComponent text={listEndText} />
                )
              ) : null}
              {isFetching && page > 1 ? (
                ListLoadMoreComponent ? (
                  <ListLoadMoreComponent />
                ) : (
                  <DefaultLoadMoreComponent text={loadingMoreText} />
                )
              ) : null}
              {ListFooterComponent}
            </View>
          }
          ListEmptyComponent={
            isFetching ? (
              <Loading show={isFetching} text='Loading items...' showBall={false} />
            ) : ListEmptyComponent ? (
              <ListEmptyComponent />
            ) : (
              <DefaultEmptyComponent text={listEndText} />
            )
          }
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
