import React from "react";
import styles from "./styles";
import { View, Text } from "react-native";
import { Image } from "native-base";
import I18n from "../../../translations";

export default function Item({ showSpotify, item }) {
  return (
    <View style={styles.item}>
      <Image source={{ uri: item.image }} size={"sm"} alt="Ilustration" />
      <View style={styles.details}>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {item.title}
          </Text>
          {item.subtitle && (
            <Text
              style={styles.subtitle}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.subtitle}
            </Text>
          )}
          {showSpotify && (
            <View style={styles.containerSpotify}>
              <Image
                style={styles.iconSpotify}
                source={require("../../../assets/spotifyIcon.png")}
                alt="Spotify"
              />
              <Text style={styles.textSpotify}>{I18n.t("clickAndListen")}</Text>
            </View>
          )}
        </View>
        <Text style={styles.subtitle}>{item.extraInfo}</Text>
      </View>
    </View>
  );
}
