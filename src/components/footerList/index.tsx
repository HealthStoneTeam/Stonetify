import React from "react";
import { Text, View, Image } from "react-native";
import styles from "./styles";

export default function FooterList() {
  return (
    <View style={styles.container}>
      <View style={styles.appIconContainer}>
        <Image
          style={styles.appIcon}
          source={require("../../../assets/icon.png")}
          alt="App Icon"
        />
        <Text style={styles.appName}>Stonetify</Text>
      </View>
      <View style={styles.spotifyIconContainer}>
        <Image
          style={styles.logoSpotify}
          source={require("../../../assets/spotifyLogo.png")}
          alt="Spotify"
        />
      </View>
    </View>
  );
}
