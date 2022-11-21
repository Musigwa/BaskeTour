import React, { useEffect } from "react";
import { StatusBar, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Logo from "../assets/svgs/Logo";
import BallIcon from "../assets/svgs/BallIcon";
import HoopIcon from "../assets/svgs/HoopIcon";
import { useAppSelector } from "../hooks/useStore";

import { SetupStackScreenProps } from "../types";

import { Paragraph, View } from "../styles/styled-elements";

function SetupTypeScreen({ navigation }: SetupStackScreenProps<"ActionType">) {
  const insets = useSafeAreaInsets();
  const { newGroup } = useAppSelector((state) => state.groups);

  const handleCreateGroup = () => {
    navigation.push("CreateGroup");
  };

  const handleJoinGroup = () => {
    navigation.navigate("JoinGroup");
  };

  const handleSkip = () => {
    navigation.navigate("Root");
  };

  // useEffect(() => {
  //   if(newGroup) {
  //     navigation.push('Root')
  //   }
  // }, [newGroup]);
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
        <View mt={100} w-100>
          <Touchable mb={23} onPress={handleCreateGroup}>
            <Action>
              <ActionIcons>
                <BallIcon />
              </ActionIcons>
              <ActionButtonText>Create New Group</ActionButtonText>
            </Action>
          </Touchable>

          <Touchable style={{ width: "100%" }} onPress={handleJoinGroup}>
            <Action bg="accentPurple">
              <ActionIcons>
                <HoopIcon />
              </ActionIcons>

              <ActionButtonText>Join Existing Group</ActionButtonText>
            </Action>
          </Touchable>
        </View>

        <Bottom items-center>
          {/* <Button text="Get Started" onPress={handleGetStarted} /> */}
          <TouchableOpacity onPress={handleSkip}>
            <ActionText mt={50}>Skip For Now</ActionText>
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
  /* margin-top: 262px; */
`;

const Action = styled(View)<{ bg?: "accentPurple" | "accentBlue" }>`
  position: relative;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme[props.bg || "accentBlue"]};
  height: 114px;
  width: 100%;
  border-radius: 4px;
`;

const ActionButtonText = styled(Paragraph)`
  color: white;
  font-size: 18px;
  font-weight: 600;
`;

const ActionIcons = styled(View)`
  position: absolute;
  left: 31px;
`;

const Touchable = styled.TouchableOpacity<{ mb: number }>`
  width: 100%;
  margin-bottom: ${(props) => (props.mb ? props.mb + "px" : 0)};
`;

export default SetupTypeScreen;
