import React from "react";
import { StatusBar } from "expo-status-bar";
import styled from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Input from "../components/common/Input";
import Button from "../components/common/Buttons";

import { Paragraph, View } from "../styles/styled-elements";

const CreateGroupScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <Container pb={insets.bottom} content-center items-center>
      <StatusBar style="dark" />
      <Title mb={80}>Create New Group</Title>
      <Input
        placeholder="Group name"
        label="Group Name"
        name="email"
        required
        handleChange={() => {}}
        handleBlur={() => {}}
        // error={errors.email}
      />
      <View mt={60} w-100>
      <Button text="Create Group" onPress={() => {}} />
      </View>
      
    </Container>
  );
};

const Container = styled(View)`
  flex: 1;
  padding-left: 24px;
  padding-right: 24px;
  background-color: white;
`;

const Title = styled(Paragraph)`
  font-size: 24px;
  font-weight: bold;
`;

export default CreateGroupScreen;
