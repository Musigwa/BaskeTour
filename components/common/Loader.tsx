import React from "react";
import { useTheme } from "styled-components/native";
import styled from "styled-components/native";
import { ActivityIndicator } from "react-native";
import Modal from "react-native-modal";

import BasketBallIcon from "../../assets/svgs/BasketBallIcon";

import { View, Paragraph } from "../../styles/styled-elements";

interface IProps {
  show: boolean;
  hasBackdrop?: boolean;
  text?: string
}

const Loader = ({ show, hasBackdrop = false, text }: IProps) => {
  const theme = useTheme();
  return (
    <Modal
      style={{ alignItems: "center" }}
      isVisible={show}
      hasBackdrop={hasBackdrop}
      animationIn="fadeIn"
      animationOut="fadeOut"
    >
      <ModalContent>
        <BasketBallIcon />
        <View mt={10}>
          <ActivityIndicator color={theme.primary} />
        </View>
        <View>
          <Label>{text}</Label>
        </View>
      </ModalContent>
    </Modal>
  );
};

export default Loader;

const Wrapper = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: white;
  z-index: 1000;
`;

const ModalContent = styled(View)`
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 100%;
  height: 100%;
`;

const Label = styled(Paragraph)`
  margin-top: 10px;
  font-size: 24px;
  font-weight: bold;
`
