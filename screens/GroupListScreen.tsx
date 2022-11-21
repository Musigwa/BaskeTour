import { useNavigation } from "@react-navigation/native";
import React from "react";
import GroupSearch from "../components/common/GroupSearch";
import { IGroup } from "../interfaces";

const GroupListScreen = () => {
  const navigation = useNavigation();

  const handleGroupSelect = (group: IGroup) => {
    console.log("The selected group ==>", group);
    navigation.goBack();
  };

  return <GroupSearch onSelect={handleGroupSelect} title="Select A Group" />;
};

export default GroupListScreen;
