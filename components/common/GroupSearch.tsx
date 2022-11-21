import { useTheme } from "@react-navigation/native";
import { Formik } from "formik";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import Input from "../../components/common/Input";
import { IGroup } from "../../interfaces";
import { useGetGroupsQuery } from "../../store/api-queries/group-queries";
import {
  Container,
  ErrorMessage,
  H3,
  Title,
  View,
} from "../../styles/styled-elements";
import RadioButton from "./RadioButton";

type GroupSearchProps = {
  onSelect: (group: IGroup) => void;
  title?: string;
  msg404?: string;
  btnText?: string;
};

const GroupSearch: React.FC<GroupSearchProps> = ({
  title = "Join Existing Group",
  onSelect,
  msg404 = "Group does not exist. Contact your group admin",
  btnText = "Confirm Selection",
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [skip, setSkip] = useState(false);

  const {
    data: groups,
    isLoading,
    refetch,
  } = useGetGroupsQuery({ searchQuery: searchQuery }, { skip });
  const [selectedItem, setSelectedItem] = useState<IGroup>();

  const { colors } = useTheme();

  useEffect(() => {
    if (searchQuery.length) setSkip(false);
  }, [searchQuery]);

  const debouncedUpdate = _.debounce((text) => {
    return setSearchQuery(text), 300, { leading: true, trailing: false };
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container style={{ justifyContent: "flex-start", paddingBottom: 0 }}>
        <Title>{title}</Title>
        <Formik initialValues={{ searchQuery: "" }} onSubmit={refetch}>
          {({ handleChange, values }) => {
            debouncedUpdate(values.searchQuery);
            return (
              <View w-100 mb={20} mt={20}>
                <Input
                  placeholder="Type to search by name..."
                  placeholderColor="gray"
                  name="searchQuery"
                  required
                  handleChange={handleChange}
                  handleBlur={() => {}}
                  style={{ fontSize: 16 }}
                />
              </View>
            );
          }}
        </Formik>
        <FlatList
          data={groups?.data ?? []}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }: { item: IGroup }) => (
            <GroupListItem w-100 key={item.id}>
              <RadioButton
                selected={selectedItem?.id === item.id}
                color={colors.primary}
                text={item.groupName}
                onClick={(text) =>
                  setSelectedItem(groups.data.find((g) => g.groupName === text))
                }
              />
            </GroupListItem>
          )}
          ListFooterComponent={
            <View w-100>
              {!isLoading &&
                groups &&
                Array.isArray(groups.data) &&
                groups.data.length === 0 && (
                  <ErrorMessage>{msg404}</ErrorMessage>
                )}
            </View>
          }
        />
        <TouchableOpacity
          style={{
            backgroundColor: !!selectedItem ? colors.primary : "#CCCCCC",
            padding: 15,
            borderRadius: 10,
            marginTop: 10,
          }}
          onPress={() => onSelect(selectedItem)}
          disabled={!selectedItem}
        >
          <H3 style={{ color: "white" }}>{btnText}</H3>
        </TouchableOpacity>
      </Container>
    </SafeAreaView>
  );
};

const GroupListItem = styled(View)`
  padding: 12px 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export default GroupSearch;
