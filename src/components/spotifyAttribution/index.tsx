import React from "react";
import { Image, StyleProp, View, ViewStyle } from "react-native";
import { SpotifyLogoTone } from "../../utils/shareTheme";
import styles from "./styles";

type SpotifyAttributionProps = {
  tone: SpotifyLogoTone;
  style?: StyleProp<ViewStyle>;
};

export default function SpotifyAttribution({
  tone,
  style,
}: SpotifyAttributionProps) {
  return (
    <View style={[styles.container, style]}>
      <Image
        style={[
          styles.logo,
          tone === "white" ? styles.whiteLogo : undefined,
        ]}
        source={require("../../../assets/spotifyLogoBlack.png")}
        resizeMode="contain"
        alt="Spotify"
      />
    </View>
  );
}
