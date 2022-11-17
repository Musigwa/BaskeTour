import { AntDesign } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useTheme } from "@react-navigation/native";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, View } from "react-native";
import styled from "styled-components/native";
import { games } from "../constants/dummy";
import { countDownTimer } from "../utils/methods";
countDownTimer;

// type Pick = {
//   tournamentId?: string;
//   gameId: string;
//   teamId: string;
// };

const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const Headline = styled.Text`
  font-size: 18px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: 0.8px;
  text-align: left;
`;

const HorizontalView = styled.TouchableOpacity`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const Separator = styled.View`
  border: 1px solid #e9ebed;
  margin-vertical: 5px;
`;

const MedBoldText = styled.Text`
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-align: left;
`;

const SMBoldText = styled.Text`
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.8px;
  text-align: left;
`;

const Card = styled(HorizontalView)`
  background: white;
  box-shadow: 0px 0px 20px rgba(35, 20, 115, 0.08);
  border-radius: 4px;
  padding: 25px;
  margin-vertical: 20px;
`;

const AvatarContainer = styled.ImageBackground`
  background: #ffffff;
  border: 2px solid #cccccc;
  border-radius: 4px;
  width: 54px;
  height: 54px;
  justify-content: center;
  align-items: center;
`;

const BoldText = styled.Text`
  line-height: 20px;
  font-weight: 700;
  letter-spacing: 0.8px;
`;

const PicksScreen = () => {
  const { colors } = useTheme();
  const [timer, setTimer] = useState<number[]>(Array(4).fill(0));
  const [picks, setPicks] = useState<any[]>([]);

  useEffect(() => {
    countDownTimer(games[0].eventDate, setTimer);
  }, []);

  const updatePicks = (pick) => {
    if (picks.find((p) => JSON.stringify(p) === JSON.stringify(pick))) {
      console.log("exists==>", picks);
      setPicks((state) =>
        state.filter((a) => JSON.stringify(a) !== JSON.stringify(pick))
      );
    } else {
      console.log("doesn't exist==>", picks);
      setPicks((state) => [...state, pick]);
    }
  };

  return (
    <Container>
      <View style={{ padding: 15 }}>
        <Headline style={{ color: colors.primary }}>
          Time remaining to make picks
        </Headline>
        <HorizontalView style={{ marginVertical: 15 }}>
          {["Days", "Hours", "Minutes", "Seconds"].map((el, idx) => {
            return (
              <View key={idx}>
                <MedBoldText>{timer[idx]}</MedBoldText>
                <SMBoldText>{el}</SMBoldText>
              </View>
            );
          })}
        </HorizontalView>
        <Separator />
        <MedBoldText style={{ marginTop: 35, marginBottom: 10 }}>
          Pick teams to win
        </MedBoldText>
        <Headline style={{ color: colors.primary, marginBottom: 15 }}>
          Select 3 teams for Round of 64
        </Headline>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {games.map(({ id: gameId, teamA, teamB, eventDate }, idx) => (
          <View key={idx}>
            {[teamA, teamB].map(({ teamId, logo, name, ranking }, i) => (
              <View key={i} style={{ paddingHorizontal: 15 }}>
                <Card
                  style={{
                    backgroundColor: colors.card,
                  }}
                  activeOpacity={0.8}
                  onPress={() => updatePicks({ teamId })}
                >
                  <HorizontalView style={{ flex: 0.86 }}>
                    <AvatarContainer>
                      <Image
                        source={{ uri: logo }}
                        resizeMode="contain"
                        resizeMethod="auto"
                        style={{ width: 35, height: 35 }}
                      />
                    </AvatarContainer>
                    <View>
                      <BoldText style={{ fontSize: 12 }}>
                        {moment(eventDate).format("ddd, MM/D/YYYY, h:mm A")}
                      </BoldText>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <BoldText style={{ fontSize: 14, color: "#979797" }}>
                          ({ranking})
                        </BoldText>
                        <BoldText style={{ fontSize: 18 }}>{name}</BoldText>
                      </View>
                    </View>
                  </HorizontalView>
                  <AntDesign
                    name="checksquare"
                    size={24}
                    color={colors.background}
                  />
                </Card>
                {!i ? (
                  <BoldText style={{ fontSize: 12, textAlign: "center" }}>
                    VS
                  </BoldText>
                ) : null}
              </View>
            ))}
            {idx !== games.length - 1 ? <Separator /> : null}
          </View>
        ))}
      </ScrollView>
    </Container>
  );
};

const Tab = createMaterialTopTabNavigator();

const tabBarLabelStyle = {
  fontSize: 18,
  textTransform: "capitalize",
  fontWeight: "700",
};

export default () => {
  const { colors } = useTheme();
  return (
    <Tab.Navigator screenOptions={{ tabBarLabelStyle }}>
      {["East", "South", "Midwest", "West"].map((el, idx) => (
        <Tab.Screen
          key={idx}
          name={el}
          component={PicksScreen}
          options={{
            tabBarInactiveTintColor: colors.border,
            tabBarActiveTintColor: colors.primary,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};
