import React, { useState } from "react";
import styled from "styled-components/native";
import { Horizontal, Paragraph, Separator } from "../styles/styled-elements";

import moment from "moment";
import { Pressable, ScrollView, View } from "react-native";
import TeamContainer from "../components/scores/TeamContainer";
import { games } from "../constants/dummy";
import { useTheme } from "@react-navigation/native";

const AllScoresScreen = () => {
  const statuses = ["upcoming", "live", "complete"];

  const { colors } = useTheme();
  const [currentTab, setCurrentTab] = useState(statuses[0]);

  return (
    <Container>
      <RoundBanner
        tintColor="red"
        source={require("../assets/images/roundImage.png")}
      >
        <InnerBanner>
          <BannerText>Round of 64</BannerText>
        </InnerBanner>
      </RoundBanner>
      <Horizontal>
        {statuses.map((lb, idx) => {
          return (
            <Pressable
              key={idx}
              style={{ padding: 20 }}
              onPress={() => setCurrentTab(lb)}
            >
              <H3
                style={{
                  textTransform: "capitalize",
                  fontWeight: currentTab === lb ? "700" : "500",
                  color: currentTab === lb ? colors.primary : "black",
                }}
              >
                {lb}
              </H3>
            </Pressable>
          );
        })}
      </Horizontal>
      <Separator />
      <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 0 }}>
        {games.map(({ teamA, teamB, eventDate }, idx) => {
          return (
            <View key={idx}>
              <Horizontal>
                <TeamsWrapper
                  style={{
                    flex: 0.76,
                    borderRightWidth: 1.5,
                    borderRightColor: "#e9ebed",
                  }}
                >
                  {[teamA, teamB].map((team, idx) => (
                    <TeamContainer key={idx} team={team} />
                  ))}
                </TeamsWrapper>
                {currentTab === "complete" ? (
                  <H6>Final</H6>
                ) : (
                  <View>
                    {currentTab === "live" ? (
                      <H6 style={{ color: colors.primary }}>10:27- 1st</H6>
                    ) : null}
                    <H6>{moment(eventDate).format("ddd, MM/YY")}</H6>
                    <H6>{moment(eventDate).format("LT")}</H6>
                    <H6>TCU -9.5</H6>
                  </View>
                )}
              </Horizontal>
              <Separator />
            </View>
          );
        })}
      </ScrollView>
    </Container>
  );
};

const TeamsWrapper = styled.View`
  padding-right: 20px;
  justify-content: space-evenly;
  min-height: 80px;
  margin: 10px 0px;
`;
const Container = styled(View)`
  flex: 1;
  width: 100%;
`;

const RoundBanner = styled.ImageBackground`
  width: 100%;
  height: 68px;
`;

const InnerBanner = styled(View)`
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgba(79, 20, 115, 0.74);
`;

const H3 = styled(Paragraph)`
  font-size: 18px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: -0.165px;
  text-align: center;
`;

const H6 = styled(Paragraph)`
  font-size: 12px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0.7799999713897705px;
`;

const BannerText = styled(H3)`
  color: white;
`;

export default AllScoresScreen;
