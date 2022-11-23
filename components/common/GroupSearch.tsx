import { useTheme } from "@react-navigation/native";
import { Formik } from "formik";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import styled from "styled-components/native";
import Input from "../../components/common/Input";
import { IGroup } from "../../interfaces";
import { useGetProfileQuery } from "../../store/api-queries/auth-queries";
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
  groupsList?: IGroup[];
  ownGroups?: boolean;
};

const GroupSearch: React.FC<GroupSearchProps & any> = ({
  title = "Join Existing Group",
  onSelect,
  msg404 = "Group does not exist. Contact your group admin",
  btnText = "Confirm Selection",
  groupsList,
  ownGroups = false,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [skip, setSkip] = useState(false);

  // const {
  //   data: { data: allGroups } = {},
  //   isLoading,
  //   refetch,
  // } = useGetGroupsQuery({ searchQuery }, { skip });

  const { data: { data: profile } = {}, isLoading } = useGetProfileQuery(
    undefined,
    {
      refetchOnReconnect: true,
    }
  );

  const [selectedItem, setSelectedItem] = useState<IGroup>();
  const [groups, setGroups] = useState<IGroup[]>([]);
  const { colors } = useTheme();

  useEffect(() => {
    setGroups((ownGroups ? profile?.groups : []) ?? []);
  }, []);

  const handleSearch = (text: string) => {
    if (ownGroups) {
      const temp = groups.filter((g) =>
        g.groupName.toLowerCase().includes(text.toLowerCase())
      );
      setGroups(temp);
    }
  };

  const debouncedSearchHandler = useCallback(debounce(handleSearch, 300), []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container style={{ justifyContent: "flex-start", paddingBottom: 0 }}>
        <Title>{title}</Title>
        <View w-100 mb={20} mt={20}>
          <TextInput
            autoCapitalize="none"
            onChangeText={debouncedSearchHandler}
            placeholder="Type to search by name..."
            placeholderTextColor="gray"
            style={{ fontSize: 18 }}
          />
        </View>
        <FlatList
          data={groups}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }: { item: IGroup }) => (
            <GroupListItem w-100 key={item.id}>
              <RadioButton
                selected={selectedItem?.id === item.id}
                color={colors.primary}
                text={item.groupName}
                onClick={(text) =>
                  setSelectedItem(groups?.find((g) => g.groupName === text))
                }
              />
            </GroupListItem>
          )}
          ListFooterComponent={
            <View w-100>
              {!isLoading &&
                groups &&
                Array.isArray(groups) &&
                groups.length === 0 && <ErrorMessage>{msg404}</ErrorMessage>}
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
