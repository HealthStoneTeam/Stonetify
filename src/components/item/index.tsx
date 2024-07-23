import React from "react";
import styles from "./styles";
import { View, Text } from "react-native";
import { Image } from "native-base";
import I18n from "../../../translations";
import { GenericDataProps } from "../../models/types/genericData";
import { Items, ItemsProps } from "../../models/types/items";

export default function Item({ data }: GenericDataProps<ItemsProps>) {
  return (
    <View style={styles.item}>
      {data.showImages && (
        <Image source={{ uri: data.item.image }} size={"sm"} alt="Ilustration" />
      )}
      <View style={styles.details}>
        <View style={styles.titleContainer}>
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {data.item.title}
          </Text>
          {data.item.subtitle && (
            <Text
              style={styles.subtitle}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {data.item.subtitle}
            </Text>
          )}
          {data.showSpotify && (
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
        <Text style={styles.subtitle}>{data.item.extraInfo}</Text>
      </View>
    </View>
  );
}
