import { IUser } from "./../types/api";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const currentUser = (async () => {
  const auth = JSON.parse(
    (await AsyncStorage.getItem("persist:root")) || ""
  ).auth;
  const currentUser = JSON.parse(auth);
  return currentUser.user;
})();
export default () => {
  const [currentUser, setCurrentUser] = useState<IUser | null>();
  useEffect(() => {
    (async () => {
      const auth = JSON.parse(
        (await AsyncStorage.getItem("persist:root")) || ""
      ).auth;
      const currentUser = JSON.parse(auth);
      setCurrentUser(currentUser.user);
    })();
  }, []);

  return {
    currentUser,
    setCurrentUser,
  };
};
