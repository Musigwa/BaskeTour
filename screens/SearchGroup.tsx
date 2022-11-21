import { MaterialIcons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Pressable } from "react-native";
import styled from "styled-components/native";
import GroupSearch from "../components/common/GroupSearch";
import { IGroup } from "../interfaces";
import { BackButtonWrapper, Paragraph, View } from "../styles/styled-elements";
import { JoinGroupStackParamList } from "../types";

type SearchGroupProps = NativeStackScreenProps<
  JoinGroupStackParamList,
  "SearchGroup"
>;

const SearchGroup: React.FC<SearchGroupProps> = ({ navigation }) => {
  const handleJoinGroup = (group: IGroup) => {
    if (group.availableSpots === 0) navigation.navigate("FullGroup", { group });
    navigation.navigate("Join", { group: group });
  };

  return (
    <GroupSearch onSelect={handleJoinGroup} btnText="Join Selected Group" />
  );
};

export const searchGroupScreenOptions = ({ navigation }) => ({
  headerShown: true,
  headerTitle: "",
  headerStyle: { elevation: 0, shadowOpacity: 0, backgroundColor: "#fff" },

  headerLeft: (props) => (
    <BackButtonWrapper>
      <Pressable onPress={navigation.goBack} {...props}>
        <MaterialIcons name="arrow-back-ios" size={24} color="black" />
      </Pressable>
    </BackButtonWrapper>
  ),
});

export default SearchGroup;
