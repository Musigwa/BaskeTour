import React, { useEffect, useState } from "react";
import { Container, Paragraph, Title, View } from "../styles/styled-elements";
import Input from "../components/common/Input";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { IGroup } from "../interfaces";
import Button from "../components/common/Buttons";
import PinCodeInput from "../components/common/PinCodeInput";
import { Formik, useFormikContext } from "formik";
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { JoinGroupStackParamList } from "../types";
import { useJoinGroupMutation } from "../store/api-queries/group-queries";
import { join } from "lodash";
import styled from "styled-components";

interface IJoinGroupProps {
  navigation: NavigationProp<any, any>;
  route: RouteProp<JoinGroupStackParamList, any>;
}

const JoinGroupScreen: React.FC<IJoinGroupProps> = ({ navigation, route }) => {
  const {
    params: { group },
  } = route;

  const [joinGroup, { isLoading, data }] = useJoinGroupMutation();
  console.log("data", data);

  const [PIN, setPIN] = useState<string>("");
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [error, setError] = useState<unknown | Error>(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleSubmit = async () => {
    try {
      await joinGroup({
        groupId: group.id,
        groupPIN: PIN,
      }).unwrap();
      navigation.navigate("JoinGroup", {
        screen: "Success",
      });
    } catch (error) {
      setError(error.data.message);
    }
  };

  const PINValueChangeHandler = (pin: string) => setPIN(pin);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container
          style={{
            justifyContent: "flex-start",
          }}
        >
          <>
            <View w-100 flex={keyboardVisible ? 0.7 : 1}>
              <Title>Join Existing Group </Title>

              <View w-100 mt={40}>
                <GroupNameContainer w-100>
                  <GroupNameLabel>Group name</GroupNameLabel>
                  <GroupName>{group?.groupName}</GroupName>
                </GroupNameContainer>
              </View>

              <View w-100 mb={40} mt={40}>
                <PinCodeInput
                  value={PIN}
                  onChangeText={PINValueChangeHandler}
                />
              </View>
              <View w-100 mt={40} flex-row justify-center align-center>
                {error && <ErrorMessage w-100>{error}</ErrorMessage>}
              </View>
            </View>

            <Button
              text="Join"
              onPress={handleSubmit}
              loading={isLoading}
              disabled={isLoading || PIN.length < 4}
            />
          </>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export const joinGroupScreenOptions = () => ({
  headerShown: true,
  headerTitle: "",
  headerStyle: {
    elevation: 0,
    shadowOpacity: 0,
  },
});

const GroupNameContainer = styled(View)`
  border-top-width: 1px;
  border-bottom-width: 1px;
  padding: 14px 0 14px 0;
  border-color: #e9ebed;
`;

const GroupNameLabel = styled(Paragraph)`
  font-size: 12px;
  color: #8d8d8d;
  margin-bottom: 4px;
`;

const GroupName = styled(Paragraph)`
  font-size: 16px;
`;

const ErrorMessage = styled(Paragraph)`
  color: #ee3c15;
  text-align: center;
  font-size: 12px;
  //  font-family: "Montserrat";
`;

export default JoinGroupScreen;
