import React from "react";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Paragraph, View } from "../../styles/styled-elements";

interface IProps extends NativeStackHeaderProps {}

const ScreenHeader = ({ navigation, back, options }: IProps) => {
  const insets = useSafeAreaInsets();
  console.log(insets);
  return (
    <Wrapper>
      <InnerWrapper mt={insets.top}>
        <Back onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back-ios" size={18} color="black" />
        </Back>
        <Paragraph>{options.title} </Paragraph>
      </InnerWrapper>
    </Wrapper>
  );
};

const Wrapper = styled(View)`
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background-color: white;
`;

const InnerWrapper = styled(View)`
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: row;  
  padding-left: 24px;
  padding-right: 24px;
  background-color: white;
`;


const Back = styled.Pressable`
  position: absolute;
  left: 24px;
`;

export default ScreenHeader;
