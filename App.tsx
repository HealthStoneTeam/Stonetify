import AuthProvider from "./src/contexts/auth";
import "react-native-gesture-handler";
import Routes from "./src/routes";
import { NativeBaseProvider } from "native-base";
import i18n from "./translations";
import * as Localization from "expo-localization";
import React from "react";

i18n.locale =
  Localization?.getLocales()?.at(0)?.regionCode === "BR" ? "pt" : "en";

export default function App() {
  return (
    <NativeBaseProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NativeBaseProvider>
  );
}
