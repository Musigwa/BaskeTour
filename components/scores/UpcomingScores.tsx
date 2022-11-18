import React from "react";
import { RefreshControl } from "react-native";
import styled from "styled-components/native";

import UpcomingCard from "./UpcomingCard";

import { View, Paragraph } from "../../styles/styled-elements";

const UpcomingScores = () => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    setRefreshing(false);
  }, []);

  const data = [1, 2];
  return (
    <List
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      data={data}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      renderItem={({ item }) => <UpcomingCard />}
    />
  );
};

const Container = styled(View)`
  width: 100%;
`;

const List: React.FC<any> = styled.FlatList.attrs(() => ({
  contentContainerStyle: {
    // justifyContent: "space-between",
    // alignItems: "center",
    flexGrow: 1,
  },
}))`
  padding: 0px;
  margin: 0px;
  width: 100%;
`;

export default UpcomingScores;
