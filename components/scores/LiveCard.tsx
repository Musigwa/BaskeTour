import React from "react";

import styled, { useTheme } from "styled-components/native";
import { View, Paragraph } from "../../styles/styled-elements";

const LiveCard = () => {
  const theme = useTheme();
  return (
    <Wrapper>
      <FirstSection>
        <View flex-row mb={11} w-100 items-center>
          <TeamLogoWrapper>
            <TeamLogo source={require("../../assets/images/Team1.png")} />
          </TeamLogoWrapper>

          <View flex-row space-between flex={1}>
            <View flex-row>
              <Paragraph mr={5} color="#CBB7B7" size={10}>
                1
              </Paragraph>
              <TeamName size={10}>Arizona</TeamName>
            </View>

            <Paragraph size={10}>7</Paragraph>
          </View>
        </View>

        <View flex-row w-100 items-center>
          <TeamLogoWrapper>
            <TeamLogo source={require("../../assets/images/Team2.png")} />
          </TeamLogoWrapper>

          <View flex-row space-between flex={1}>
            <View flex-row>
              <Paragraph mr={5} color="#CBB7B7" size={10}>
                9
              </Paragraph>
              <TeamName size={10}>Buffalo</TeamName>
            </View>
            <Paragraph size={10}>0</Paragraph>
          </View>
        </View>
      </FirstSection>
      <SecondSection>
        <Paragraph size={10} mb={8} color={theme?.primary}>
          10:27- 1st
        </Paragraph>
        <Paragraph size={10} mb={8}>
          Sat, 9/23
        </Paragraph>
        <Paragraph size={10} mb={8}>
          10:00AM
        </Paragraph>
        <Paragraph size={10}>TCU -9.5</Paragraph>
      </SecondSection>
    </Wrapper>
  );
};

const Wrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  width: 100%;
  border-top-width: 1px;
  border-color: #ddddde;
  padding: 12px 25px;
`;

const FirstSection = styled(View)`
  flex: 1;
`;

const SecondSection = styled(View)`
  width: 20%;
  margin-left: 20px;
  border-left-width: 1px;
  border-color: #ddddde;
  height: 100%;
  align-items: flex-end;
`;

const TeamName = styled(Paragraph)`
  font-family: Montserrat_700Bold;
`;

const TeamLogo = styled.Image``;

const TeamLogoWrapper = styled(View)`
  width: 20%;
`;

export default LiveCard;
