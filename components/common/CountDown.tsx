import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { H2, H6, Horizontal } from "../../styles/styled-elements";
import { countDownTimer } from "../../utils/methods";

const CountDown = ({ date }: { date: Date } & any) => {
  const [timer, setTimer] = useState<number[]>(Array(4).fill(0));
  useEffect(() => {
    countDownTimer(date, setTimer);
  }, []);

  return (
    <Horizontal style={{ marginVertical: 15 }}>
      {["Days", "Hours", "Minutes", "Seconds"].map((el, idx) => (
        <View key={idx}>
          <H2>{timer[idx]}</H2>
          <H6>{el}</H6>
        </View>
      ))}
    </Horizontal>
  );
};

export default CountDown;
