import { Entypo } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation, useTheme } from "@react-navigation/native";
import React, { Fragment } from "react";
import styled from "styled-components/native";
import RankingScreen from "../screens/RankingScreen";
import { H4 } from "../styles/styled-elements";

const Tab = createMaterialTopTabNavigator();

const Pressable = styled.TouchableOpacity`
  margin-top: 18px;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export default () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const groupSelect = () => {
    navigation.navigate("GroupList");
  };

  return (
    <Fragment>
      <Pressable activeOpacity={0.6} onPress={groupSelect}>
        <H4 style={{ paddingRight: 20 }}>Best Five Group</H4>
        <Entypo name="chevron-small-down" size={24} color="black" />
      </Pressable>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            fontWeight: "700",
            fontSize: 18,
            textTransform: "capitalize",
          },
        }}
      >
        {["Round 64", "Round 32", "Sweet 16"].map((el, idx) => (
          <Tab.Screen
            key={idx}
            name={el}
            component={RankingScreen}
            options={{
              tabBarInactiveTintColor: colors.border,
              tabBarActiveTintColor: colors.primary,
            }}
          />
        ))}
      </Tab.Navigator>
    </Fragment>
  );
};
