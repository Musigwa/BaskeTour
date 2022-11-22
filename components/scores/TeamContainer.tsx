import React from "react";
import { Image } from "react-native";
import { H6, Horizontal } from "../../styles/styled-elements";
import defLogo from "../../assets/images/defLogo.png";
import { GAME_STATUS } from "../../types";
import { useTheme } from "@react-navigation/native";
import { Iteam } from "../../interfaces";

type TeamProps = {
  team: Iteam;
  currentTab: GAME_STATUS;
};

const TeamContainer = ({ team, currentTab }: TeamProps) => {
  const { colors } = useTheme();
  return (
    <Horizontal>
      <Horizontal style={{ justifyContent: "flex-start" }}>
        <Image
          source={team.logo ? { uri: team.logo } : defLogo}
          style={{ width: 30, height: 30, marginRight: 15, borderRadius: 15 }}
          resizeMode="contain"
        />
        <H6 style={{ color: "#CBB7B7" }}>
          {`${team?.ranking}\u0020`}
          <H6 style={{ color: "#000" }}>{team.name}</H6>
        </H6>
      </Horizontal>
      <H6 style={{ color: team.isWinner ? colors.primary : "black" }}>
        {currentTab === "STATUS_FINAL" ? team.score : team.record}
      </H6>
    </Horizontal>
  );
};

export default TeamContainer;
