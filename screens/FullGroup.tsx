import { NavigationProp } from "@react-navigation/native";
import React from "react";
import styled from "styled-components/native";
import WarningIcon from "../assets/svgs/WarningIcon";
import Button from "../components/common/Buttons";
import { Container, Paragraph, Title, View } from "../styles/styled-elements";

interface IFullGroupProps {
  navigation: NavigationProp<any, any>;
}
const FullGroupScreen: React.FC<IFullGroupProps> = ({ navigation }) => {
  const gotItButtonClickHandler = () => {
    navigation.navigate("JoinGroup", {
      screen: "SearchGroup",
    });
  };

  return (
    <Container>
      <View flex={1} w-100 flex-row items-center>
        <InfoContainer items-center w-100>
          <WarningIcon />
          <Title mt={44}>Group Is Full</Title>
          <CTAText mt={20}>Ask your admin to add more spots.</CTAText>
        </InfoContainer>
      </View>
      <View w-100 mb={40}>
        <Button bottom-0 onPress={gotItButtonClickHandler} text="Got it" />
      </View>
    </Container>
  );
};

const InfoContainer = styled(View)`
  padding: 10px;
`;

export const fullGroupScreenOptions = ({}) => ({
  headerShown: false,
});

export const CTAText = styled(Paragraph)`
  font-size: 18px;
`;

export default FullGroupScreen;
