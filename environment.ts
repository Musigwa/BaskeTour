/*****************************
 * environment.js
 * path: '/environment.js' (root of your project)
 ******************************/
import * as Updates from "expo-updates";
import { Platform } from "react-native";
const localhost =
  Platform.OS === "ios"
    ? "https://apis.cliquetheapp.com"
    : "https://apis.cliquetheapp.com";

let Config = {
  API_BASE_URL: `${localhost}/api/v1`,
  EXPO_CLIENT_ID:
    "1090165171950-4961t6immnccuu9h009cqtm3au6snbpm.apps.googleusercontent.com",
  ANDROID_CLIENT_ID:
    "1090165171950-uptbtcg8d99t67m5lraern7d1mlveeh9.apps.googleusercontent.com",
  IOS_CLIENT_ID:
    "1090165171950-nci1cjfpd6iihhfucp8q30vqate9u6gq.apps.googleusercontent.com",
};

if (Updates.channel === "production") {
  Config["API_BASE_URL"] = "https://apis.production.com";
} else if (Updates.channel === "staging") {
  Config["API_BASE_URL"] = "https://apis.cliquetheapp.com/api/v1";
}

export default Config;
