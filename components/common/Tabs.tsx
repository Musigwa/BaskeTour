import React from "react";
import { Pressable } from "react-native";
import styled from "styled-components/native";
import { Paragraph, View } from "../../styles/styled-elements";

interface IProps {
  tabs: any[];
  current: string;
  onChange: Function;
}

const Tabs = ({ tabs, current, onChange }: IProps) => {
  return (
    <Wrapper>
      {tabs.map((tab) => (
        <Pressable onPress={() => onChange(tab.label)}>
          <TabItem>
            <TabText active={current === tab.label}>{tab.label}</TabText>
          </TabItem>
        </Pressable>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 18px 10px;
  width: 100%;
`;

const TabItem = styled(View)``;

const TabText = styled(Paragraph)<{ active: boolean }>`
  text-transform: capitalize;
  font-weight: 700;
  font-size: 18px;
  color: ${(props) => (props.active ? props.theme.primary : "#7B7B7B")};
`;

export default Tabs;
