import React, { useEffect, useState } from "react";
import styles from "./styles";
import { View, Text } from "react-native";
import { Image } from "native-base";
import I18n from "../../../translations";

export default function ItemsList({ data }) {
  const [finalArray, setFinalArray] = useState(null);

  useEffect(() => {
    function objectMapper() {
      if (data?.data?.length) {
        if (data?.type == "tracks") {
          setFinalArray(objectMapperTracks());
        } else if (data?.type == "artists") {
          setFinalArray(objectMapperArtist());
        }
      } else {
        setFinalArray([]);
      }
    }

    objectMapper();
  }, []);

  function objectMapperTracks() {
    return data?.data?.map((track) => {
      return {
        image: track?.albumCover,
        title: track?.title,
        subtitle: track?.artist,
        extraInfo: track?.time,
      };
    });
  }

  function objectMapperArtist() {
    return data?.data?.map((artist) => {
      return {
        image: artist?.artistCover,
        title: artist?.title,
        extraInfo: artist?.popularity,
      };
    });
  }

  const renderItem = ({ item }) => (
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
        </View>
        <Text style={styles.subtitle}>{item.extraInfo}</Text>
      </View>
    </View>
  );

  return finalArray?.length ? (
    <View>
      {finalArray.map((item, index) => (
        <View key={index}>{renderItem({ item, index })}</View>
      ))}
    </View>
  ) : (
    <View style={styles.notFoundContainer}>
      <Text style={styles.notFoundText}>{I18n.t("noDataFound")}</Text>
    </View>
  );
}
