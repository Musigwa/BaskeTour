import React from "react";
import { TouchableOpacity, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { Paragraph } from "../../styles/styled-elements";
import { useNavigation } from "@react-navigation/native";

export default function Link({ text, screen, ...rest }) {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(screen);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text {...rest}>{text}</Text>
    </TouchableOpacity>
  );
}

const Text = styled(Paragraph)<{ color: string; size: string }>`
  color: ${(props) => (props.color ? props.color : props.theme.primary)};
  font-size: ${(props) => (props.size ? props.size + "px" : "18px")};
  font-weight: bold;
`;
