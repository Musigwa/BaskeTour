import _ from 'lodash';
import React, { ComponentType, FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, FlatListProps, ListRenderItem, StyleSheet, View, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';
import { H5 } from '../../../../styles/styled-elements';
import Searchbar from '../../Inputs/Searchbar';
import Loading from '../../Loading';

type SearchPaginatedProps = FlatListProps<any> & {
  // Required properties
  renderItem: ListRenderItem<any>;
  data: readonly any[] | null | undefined;
  updateData: (data: []) => void;
  fetchMethod: Function;
  // Optional properties
  searchable?: boolean;
  params?: { [key: string]: any };
  options?: { [key: string]: any };
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
  defaultBlank?: boolean;
  shouldRefetch?: boolean;
};

type StateProps = { page: number; text: string };

const DefaultEmptyComponent: FC<{ text: string }> = ({ text }) => (
  <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
    <H5 style={styles.empty}>{text}</H5>
  </View>
);

export const SearchPaginated: FC<SearchPaginatedProps> = ({
  data,
  params,
  options,
  updateData,
  renderItem,
  fetchMethod,
  ListEndComponent,
  ListEmptyComponent,
  ListLoadMoreComponent,
  ListFooterComponent,
  ItemSeparatorComponent,
  searchable = true,
  searchKeyName = 'searchQuery',
  perPageCountName = 'perPage',
  itemsPerPage = 12,
  scrollOnContentChange = false,
  paginatable = true,
  defaultBlank = false,
  shouldRefetch = false,
  loadingMoreText = 'Fetching more items...',
  emptyListText = '',
  listEndText = 'End of list, no more data to fetch!',
  style,
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
    data: { meta = {}, data: items = [] } = {},
  } = fetchMethod(
    {
      page,
      [searchKeyName]: text,
      [perPageCountName]: itemsPerPage,
      ...params,
    },
    options
  );
  const isListEnd = useMemo(() => meta.page === meta.totalPages, [meta.page, meta.totalPages]);
  const handleDebTextChange = useMemo(() => _.debounce(debCallback, 300), [isFetching]);
  useEffect(() => {
    updateData?.(items);
  }, [isFetching]);

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

  // Forcibly refetch the data when the boolean dependency changes
  useCallback(refetch, [shouldRefetch]);

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
        contentContainerStyle={[{ flexGrow: 1, paddingVertical: 5 }, props.contentContainerStyle]}
        data={!text.length && defaultBlank ? [] : data}
        onEndReachedThreshold={1}
        initialNumToRender={5}
        onEndReached={paginatable ? fetchMoreData : undefined}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
        keyExtractor={(item, index) => `[${index}]${item?.id}`}
        ListFooterComponent={<View style={styles.footerContainer}>{ListFooterComponent}</View>}
        ListEmptyComponent={
          isFetching ? (
            <Loading show={isFetching} text='Loading items...' showBall={false} />
          ) : ListEmptyComponent ? (
            <ListEmptyComponent />
          ) : (
            <DefaultEmptyComponent text={emptyListText} />
          )
        }
        onContentSizeChange={handleContentSizeChange}
        onLayout={handleContentSizeChange}
        {...props}
      />
    </View>
  );
};

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
