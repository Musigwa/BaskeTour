import React, { useEffect, useMemo, useState } from "react";
import { Container, Paragraph, Title, View } from "../styles/styled-elements";
import Input from "../components/common/Input";
import styled from "styled-components/native";
import { Pressable, Text, Touchable } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { IGroup } from "../interfaces";
import { useGetGroupsQuery } from "../store/api-queries/group-queries";
import { Formik } from "formik";
import _ from "lodash";

interface ISearchGroupProps {
  navigation: NavigationProp<any, any>;
}

const SearchGroup: React.FC<ISearchGroupProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [skip, setSkip] = useState(true);
  const {
    data: groups,
    isLoading,
    refetch,
  } = useGetGroupsQuery(
    {
      searchQuery: searchQuery,
    },
    { skip }
  );

  const handleJoinGroup = (group?: IGroup) => () => {
    if (group?.availableSpots === 0) {
      return navigation.navigate("JoinGroup", {
        screen: "FullGroup",
        params: {
          group,
        },
      });
    }
    navigation.navigate("JoinGroup", {
      screen: "Join",
      params: {
        group,
      },
    });
  };

  const handleJoinFUllGroup = (group?: IGroup) => () => {
    navigation.navigate("JoinGroup", {
      screen: "FullGroup",
      params: {
        group,
      },
    });
  };

  useEffect(() => {
    console.log("groups", groups);
  }, [groups]);

  useEffect(() => {
    if (searchQuery.length) {
      setSkip(false);
    }
  }, [searchQuery]);

  const debouncedUpdate = _.debounce((text) => setSearchQuery(text), 300, {
    leading: true,
    trailing: false,
  });
  return (
    <Container
      style={{
        justifyContent: "flex-start",
      }}
    >
      <Title>Join existing Group</Title>
      <Formik
        initialValues={{
          searchQuery: "",
        }}
        onSubmit={refetch}
      >
        {({ handleChange, values }) => {
          debouncedUpdate(values.searchQuery);
          return (
            <View w-100 mb={40} mt={40}>
              <Input
                placeholder="Group name"
                label="Group name"
                name="searchQuery"
                required
                handleChange={handleChange}
                handleBlur={() => {}}
              />
            </View>
          );
        }}
      </Formik>
      <View w-100 mb={40}>
        {!isLoading &&
          groups &&
          Array.isArray(groups.data) &&
          groups.data.map((group: IGroup) => {
            return (
              <GroupListItem w-100 key={group.id}>
                <GroupListTitle>{group.groupName}</GroupListTitle>
                <Pressable onPress={handleJoinGroup(group)}>
                  <JoinButton>
                    <JoinButtonLabel>Join</JoinButtonLabel>
                  </JoinButton>
                </Pressable>
              </GroupListItem>
            );
          })}

        <GroupListItem w-100>
          <GroupListTitle>Best Five Andy</GroupListTitle>
          <Pressable onPress={handleJoinFUllGroup()}>
            <JoinButton>
              <JoinButtonLabel>Join</JoinButtonLabel>
            </JoinButton>
          </Pressable>
        </GroupListItem>
      </View>
      <View w-100>
        {!isLoading &&
          groups &&
          Array.isArray(groups.data) &&
          groups.data.length === 0 && (
            <ErrorMessage>
              Group does not exist. Contact your group admin
            </ErrorMessage>
          )}
      </View>
    </Container>
  );
};

export const searchGroupScreenOptions = () => ({
  headerShown: true,
  headerTitle: "",
  headerStyle: {
    elevation: 0,
    shadowOpacity: 0,
  },
});

const GroupListItem = styled(View)`
  padding: 10px 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const GroupListTitle = styled(Paragraph)`
  font-size: 16px;
  font-weight: 500;
`;

const JoinButton = styled(View)`
  width: 68px;
  height: 28px;
  background: rgba(255, 117, 91, 0.14);
  align-items: center;
  justify-content: center;
  border-radius: 6px;
`;

const NoGroupFound = styled(Paragraph)`
  color: #ee3c15;
  font-weight: 500;
  font-size: 12px;
`;
const JoinButtonLabel = styled(Text)`
  color: #ff755b;
`;

const ErrorMessage = styled(Paragraph)`
  color: #ee3c15;
  text-align: center;
  font-size: 12px;
  //  font-family: montserrat-bold;
`;
export default SearchGroup;
