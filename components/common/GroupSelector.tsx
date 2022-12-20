import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable } from "react-native";
import { useAppSelector } from "../../hooks/useStore";
import { H4, Horizontal, Separator } from "../../styles/styled-elements";

const GroupSelector = () => {
  const { selectedGroup } = useAppSelector(({ groups }) => groups);
  const navigation = useNavigation();
  const title = selectedGroup?.groupName ?? "Select a group";

  const handlePress = () => {
    navigation.navigate("SearchGroup", { title });
  };

  return (
    <Pressable
      onPress={handlePress}
      style={{ marginVertical: 15, alignSelf: "center" }}
    >
      <Horizontal>
        <H4 style={{ paddingRight: 20 }}>{title}</H4>
        <Entypo name="chevron-small-down" size={24} color="black" />
      </Horizontal>
      <Separator />
    </Pressable>
  );
};

export default GroupSelector;
