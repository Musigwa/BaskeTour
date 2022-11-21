import { useTheme } from "@react-navigation/native";
import React from "react";
import {
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components/native";
import pp from "../assets/images/pp.jpg";
import { H2, H5, H6, Horizontal, Separator } from "../styles/styled-elements";

const RankingScreen = () => {
  const { colors } = useTheme();
  const data = Array(10).fill(0);
  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 30 }}
        contentContainerStyle={{ paddingVertical: 10 }}
      >
        {data.map((player, idx) => (
          <TouchableOpacity key={idx} activeOpacity={0.8}>
            <View style={{ padding: 15 }}>
              <Horizontal>
                <View>
                  <Horizontal>
                    <Image
                      source={pp}
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 24,
                        marginRight: 10,
                      }}
                      resizeMode="cover"
                    />
                    <View>
                      <H5>dennis</H5>
                      <H5>rodman</H5>
                    </View>
                  </Horizontal>
                  <H6 style={{ alignSelf: "flex-end", marginTop: 10 }}>
                    1. TTU(12)
                  </H6>
                </View>
                <View>
                  <View>
                    <H2>52</H2>
                    <H6>Total points</H6>
                  </View>
                  <H6 style={{ marginTop: 10 }}>2. OR(12)</H6>
                </View>
                <View>
                  <View>
                    <H2>1</H2>
                    <H6>Loss</H6>
                  </View>
                  <H6 style={{ marginTop: 10 }}>3. Nova(6)</H6>
                </View>
              </Horizontal>
            </View>
            <Separator />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

export default RankingScreen;
