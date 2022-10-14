import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styled from "styled-components/native";
import { Formik } from "formik";
import * as Yup from "yup";

import IndicatorHeader from "../components/Indicator";
import PhotoUploader from "../components/PhotoUploader";
import Input from "../components/common/Input";
import Button from "../components/common/Buttons";

import { AuthScreenProps } from "../types";

import { Paragraph, View } from "../styles/styled-elements";

function PhotoScreen({ navigation }: AuthScreenProps<"Photo">) {
  const insets = useSafeAreaInsets();

  const handleGetStarted = () => {
    navigation.push("Onboarding");
  };

  const ProfileSchema = Yup.object().shape({
    firstName: Yup.string().min(2, "Too Short").required("Field is required"),
    lastName: Yup.string().min(2, "Too Short").required("Field is required"),
  });

  return (
    <Container pt={insets.top} pb={insets.bottom}>
      <IndicatorHeader
        showBackIcon={true}
        count={2}
        currentStep={2}
        handleBackPress={() => navigation.goBack()}
      />
      <View items-center w-100 mt={50} mb={70}>
        <Title>Profile photo</Title>
      </View>

      <View w-100 items-center>
        <PhotoUploader />
        <Paragraph mt={18} color="#4F1473">
          Add photo
        </Paragraph>
      </View>

      <View mt={50} w-100>
        <Formik
          initialValues={{ firstName: "", lastName: "" }}
          validationSchema={ProfileSchema}
          onSubmit={async (values) => {
            console.log("values", values);
            navigation.push("Onboarding");
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <>
              <View w-100 mb={34}>
                <Input
                  placeholder="First name"
                  label="First name"
                  name="firstName"
                  required
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  error={errors.firstName}
                />
              </View>
              <View w-100 mb={34}>
                <Input
                  placeholder="Last name"
                  label="Last name"
                  name="lastName"
                  required
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  error={errors.lastName}
                />
              </View>
              <View mt={50} w-100 items-center>
                <Button text="Next" onPress={handleSubmit} />
              </View>
            </>
          )}
        </Formik>
      </View>
    </Container>
  );
}

const Container = styled(View)`
  flex: 1;
  padding-left: 24px;
  padding-right: 24px;
  background-color: white;
`;

const Title = styled(Paragraph)`
  font-size: 24px;
  font-weight: 700;
`;

export default PhotoScreen;
