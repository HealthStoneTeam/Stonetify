import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/auth";
import { Text, View, Image, TouchableOpacity, Alert } from "react-native";
import styles from "./styles";
import i18n from "../../../translations";
import Loading from "../../components/loading";
import { ErrorAuthenticating } from "../../errors";
import { NavigationProps } from "../../models/types/navigation";
import WaterMark from "../../components/waterMark";
import { Pages } from "../../models/enums/pages";

export default function Login({ navigation }: NavigationProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const { authenticate, getAccessToken } = useContext(AuthContext);

  useEffect(() => {
    async function validateAuth() {
      try {
        const isLogged = await getAccessToken();
        setLoading(false);
        if (isLogged) {
          navigation.navigate(Pages.PRESENTATION);
        }
      } catch (error) {
        setLoading(false);
      }
    }

    validateAuth();
  }, []);

  async function goLogin() {
    try {
      setLoading(true);
      const isLogged = await authenticate();
      if (isLogged) {
        navigation.navigate(Pages.PRESENTATION);
      } else {
        Alert.alert(i18n.t("error"), i18n.t("authError"));
      }
    } catch (error) {
      if (error instanceof ErrorAuthenticating) {
        Alert.alert(i18n.t("error"), error.message);
      } else {
        Alert.alert(i18n.t("error"), i18n.t("authError"));
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Loading
        data={{
          isLoading: loading,
        }}
      />
      <Image style={styles.logo} source={require("../../../assets/logo.png")} testID="logo-image" />
      <TouchableOpacity style={styles.loginButton} onPress={goLogin} testID="login-button">
        <Text style={styles.buttonText} testID="login-text">{i18n.t("loginWithSpotify")}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.aboutButton}
        onPress={() => navigation.navigate(Pages.ABOUT)}
        testID="about-button"
      >
        <Text style={styles.buttonText} testID="about-text">{i18n.t("about")}</Text>
      </TouchableOpacity>

      <View style={styles.watermarkContainer}>
        <WaterMark />
      </View>
    </View>
  );
}
