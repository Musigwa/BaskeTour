import React from "react";
import styled from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CameraIcon from "../assets/svgs/CameraIcon";

import { Paragraph, View } from "../styles/styled-elements";

const PhotoUploader = () => {
  return (
    <Wrapper>
      <CameraIcon />
    </Wrapper>
  );
};

const Wrapper = styled(View)`
  justify-content: center;
  align-items: center;
  width: 162px;
  height: 162px;
  border-radius: 100%;
  background-color: #e5e3ee;
`;

export default PhotoUploader;
