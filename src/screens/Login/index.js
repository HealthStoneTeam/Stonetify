import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/auth";
import { Text, View, Image, TouchableOpacity, Alert } from "react-native";
import styles from "./styles";
import I18n from "../../../translations";
import Loading from "../../components/loading";

export default function Login({ navigation }) {
  const [loading, setLoading] = useState(true);
  const { authenticate, getAccessToken } = useContext(AuthContext);

  useEffect(() => {
    async function validateAuth() {
      try {
        const isLogged = await getAccessToken();
        setLoading(false);
        if (isLogged) {
          navigation.navigate("Presentation");
        }
      } catch (error) {
        setLoading(false);
        Alert.alert(I18n.t("error"), I18n.t("validationError"));
      }
    }

    validateAuth();
  }, []);

  async function goLogin() {
    try {
      setLoading(true);
      const isLogged = await authenticate();
      setLoading(false);
      if (isLogged) {
        navigation.navigate("Presentation");
      } else {
        Alert.alert(I18n.t("error"), I18n.t("authError"));
      }
    } catch (error) {
      setLoading(false);
      Alert.alert(I18n.t("error"), I18n.t("authError"));
    }
  }

  return (
    <View style={styles.container}>
      <Loading isLoading={loading} />
      <Image style={styles.logo} source={require("../../../assets/logo.png")} />
      <TouchableOpacity style={styles.loginButton} onPress={goLogin}>
        <Text style={styles.buttonText}>{I18n.t("loginWithSpotify")}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.aboutButton}
        onPress={() => navigation.navigate("About")}
      >
        <Text style={styles.buttonText}>{I18n.t("about")}</Text>
      </TouchableOpacity>

      <View style={styles.watermarkContainer}>
        <Text style={styles.watermarkText}>{I18n.t("madeBy")}</Text>
      </View>
    </View>
  );
}
