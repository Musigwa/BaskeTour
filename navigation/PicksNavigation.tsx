import { Entypo } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation, useTheme } from "@react-navigation/native";
import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components/native";
import PicksScreen from "../screens/PicksScreen";
import { H2, H3, H4, Horizontal } from "../styles/styled-elements";
import { useGetProfileQuery } from "../store/api-queries/auth-queries.ts";
import { IGroup } from "../interfaces";
import { SafeAreaView } from "react-native";

const Tab = createMaterialTopTabNavigator();

const Pressable = styled.TouchableOpacity`
  margin-top: 18px;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export default ({ route: { params } }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [currentGroup, setCurrentGroup] = useState<IGroup | null>(null);

  useEffect(() => {
    if (params?.selected) setCurrentGroup(params?.selected);
  }, [params?.selected]);

  const groupSelect = () => {
    navigation.navigate("GroupList");
  };

  return (
    <Fragment>
      <SafeAreaView style={{ flex: 1 }}>
        <Horizontal style={{ justifyContent: "flex-end" }}>
          <H2 style={{ textAlign: "center", flex: 0.7 }}>Picks</H2>
          <Touchable activeOpacity={0.5} style={{ marginRight: 20 }}>
            <H3 style={{ color: "#CFCFCF" }}>Save</H3>
          </Touchable>
        </Horizontal>
        <Pressable activeOpacity={0.6} onPress={groupSelect}>
          <H4 style={{ paddingRight: 20 }}>
            {currentGroup?.groupName ?? "Select a group"}
          </H4>
          <Entypo name="chevron-small-down" size={24} color="black" />
        </Pressable>
        <Tab.Navigator
          screenOptions={({ navigation, route }) => ({
            tabBarLabelStyle: {
              fontWeight: "700",
              fontSize: 18,
              textTransform: "capitalize",
            },
            title: route.name,
          })}
        >
          {["East", "South", "Midwest", "West"].map((el, idx) => (
            <Tab.Screen
              key={idx}
              name={el}
              component={PicksScreen}
              options={{
                tabBarInactiveTintColor: colors.border,
                tabBarActiveTintColor: colors.primary,
              }}
            />
          ))}
        </Tab.Navigator>
      </SafeAreaView>
    </Fragment>
  );
};

const Touchable = styled.TouchableOpacity`
  border-color: #cfcfcf;
  border-width: 2px;
  padding-horizontal: 20px;
  padding-vertical: 8px;
  border-radius: 8px;
`;
