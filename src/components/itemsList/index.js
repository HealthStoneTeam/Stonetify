import React, { useEffect, useState } from "react";
import styles from "./styles";
import { View, FlatList, Text } from "react-native";
import { Image } from "native-base";

export default function ItemsList({ data }) {
  const [finalArray, setFinalArray] = useState(null);

  useEffect(() => {
    function objectMapper() {
      console.log("renderizar o trem: ", data);
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
        <View>
          <Text style={styles.title}>{item.title}</Text>
          {item.subtitle && (
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          )}
        </View>
        <Text style={styles.subtitle}>{item.extraInfo}</Text>
      </View>
    </View>
  );

  return finalArray?.length ? (
    <FlatList
      data={finalArray}
      renderItem={renderItem}
      keyExtractor={(item, index) => index?.toString()}
    />
  ) : (
    <View style={styles.notFoundContainer}>
      <Text style={styles.notFoundText}>{I18n.t("noDataFound")}</Text>    </View>
  );
}
