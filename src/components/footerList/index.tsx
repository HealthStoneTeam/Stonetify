import React from "react";
import { View } from "react-native";
import SpotifyAttribution from "../spotifyAttribution";
import styles from "./styles";
import { SpotifyLogoTone } from "../../utils/shareTheme";

type FooterListProps = {
  tone?: SpotifyLogoTone;
};

export default function FooterList({ tone = "white" }: FooterListProps) {
  return (
    <View style={styles.container}>
      <SpotifyAttribution tone={tone} />
    </View>
  );
}
