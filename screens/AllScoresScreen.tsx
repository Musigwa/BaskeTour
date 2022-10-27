import React, { useState } from "react";
import styled from "styled-components/native";
import { Paragraph, View } from "../styles/styled-elements";
import Tabs from "../components/common/Tabs";

import CompleteScores from "../components/scores/CompleteScores";
import UpcomingScores from "../components/scores/UpcomingScores";
import LiveScores from "../components/scores/LiveScores";

const AllScoresScreen = () => {
  const [currentTab, setCurrentTab] = useState("upcoming");
  const tabsList = [
    {
      label: "upcoming",
    },
    {
      label: "live",
    },
    {
      label: "complete",
    },
  ];
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

      <Tabs
        current={currentTab}
        tabs={tabsList}
        onChange={(tab) => setCurrentTab(tab)}
      />
      {currentTab === "upcoming" && <UpcomingScores />}
      {currentTab === "live" && <LiveScores />}
      {currentTab === "complete" && <CompleteScores />}
    </Container>
  );
};

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

const BannerText = styled(Paragraph)`
  color: white;
  font-size: bold;
  font-size: 18px;
`;

export default AllScoresScreen;
