import { useNavigation } from "@react-navigation/native";
import React from "react";
import GroupSearch from "../components/common/GroupSearch";
import { IGroup } from "../interfaces";

const GroupListScreen = (ownGroups: boolean = true) => {
  const navigation = useNavigation();
  const handleGroupSelect = (selected: IGroup) => {
    navigation.navigate({
      params: { selected },
      name: "Picks",
      merge: true,
    });
  };

  return (
    <GroupSearch
      onSelect={handleGroupSelect}
      title="Select A Group"
      ownGroups={ownGroups}
    />
  );
};

export default GroupListScreen;
