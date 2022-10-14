import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";

import BottomTabNavigator from "./BottomNavigator";
import AuthNavigator from "./AuthNavigator";
import SetupNavigator from "./SetupNavigator"

import { useAppSelector } from "../hooks/useStore";
import { RootStackParamList } from "../types";
/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const { token } = useAppSelector((state) => state.auth);
  return (
    <>
      {!token ? (
        <AuthNavigator />
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Setup"
            component={SetupNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Root"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NotFound"
            component={NotFoundScreen}
            options={{ title: "Oops!" }}
          />
          <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen name="Modal" component={ModalScreen} />
          </Stack.Group>
        </Stack.Navigator>
      )}
    </>
  );
}

export default RootNavigator;
