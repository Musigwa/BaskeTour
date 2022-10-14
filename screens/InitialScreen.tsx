import React from "react";
import { StatusBar, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Button from "../components/common/Buttons";
import Logo from "../assets/svgs/Logo";

import { AuthScreenProps } from "../types";

import { Paragraph, View } from "../styles/styled-elements";

function InitialScreen({ navigation }: AuthScreenProps<"Initial">) {
  const insets = useSafeAreaInsets();

  const handleGetStarted = () => {
    navigation.push("CreateAccount");
  };

  const handleSignin = () => {
    navigation.push("Login");
  };
  return (
    <>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require("../assets/images/bg_main.png")}
        pt={insets.top}
        pb={insets.bottom}
        pl={24}
        pr={24}
      >
        <View w-100 items-center mt={169}>
          <Logo />
        </View>
        <Bottom items-center>
          <Button text="Get Started" onPress={handleGetStarted} />
          <TouchableOpacity onPress={handleSignin}>
            <ActionText mt={50}>Sign in</ActionText>
          </TouchableOpacity>
        </Bottom>
      </ImageBackground>
    </>
  );
}

const ImageBackground = styled.ImageBackground<{ pt: number; pb: number }>`
  padding: 0 24px;
  padding-top: ${(props) => props.pt + "px"};
  padding-bottom: ${(props) => props.pb + "px"};
  background-color: red;
  flex: 1;
`;

const ActionText = styled(Paragraph)`
  color: ${(props) => props.theme.primary};
  text-align: center;
  width: 100%;
  font-size: 18px;
`;


const Bottom = styled(View)`
  margin-top: 262px;
`;

export default InitialScreen;
