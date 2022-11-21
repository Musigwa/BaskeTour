import React from "react";
import { Image } from "react-native";
import { H6, Horizontal } from "../../styles/styled-elements";

const TeamContainer = ({ team }: { team: any }) => {
  return (
    <Horizontal>
      <Horizontal style={{ justifyContent: "flex-start" }}>
        <Image
          source={{ uri: team.logo }}
          style={{ width: 25, height: 25, marginRight: 15 }}
        />
        <H6 style={{ color: "#CBB7B7" }}>
          {`${team.ranking}\u0020`}
          <H6 style={{ color: "#000" }}>{team.name}</H6>
        </H6>
      </Horizontal>
      <H6>{team.record}</H6>
    </Horizontal>
  );
};

export default TeamContainer;
