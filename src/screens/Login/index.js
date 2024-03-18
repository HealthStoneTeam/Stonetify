import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import { Text, View, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import I18n from "../../../translations";
import { useEffect } from "react";

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
        console.log(
          "Alguma coisa deu ruim, mas vou acreditar q não ta logado",
          error
        );
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
        console.log("Alguma coisa n deu bom");
      }
    } catch (error) {
      setLoading(false);
      console.log("Alguma outra coisa n deu bom", error);
    }
  }

  return (
    <View style={styles.container}>
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
