import React, { useEffect, useState } from "react";
import styles from "./styles";
import { View, FlatList, Text } from "react-native";
import { Image } from "native-base";

export default function ItemsList({ data }) {
  const [finalObject, setFinalObject] = useState(null);

  useEffect(() => {
    function objectMapper() {
      if (data?.type == "tracks") {
        objectMapperTracks();
      } else if (data?.type == "artist") {
        objectMapperArtist();
      }
    }

    objectMapper();
  }, []);

  function objectMapperTracks() {
    const object = {
      image: data?.albumCover,
      title: data?.title,
      subtitle: data?.artist,
      extraInfo: data?.time,
    };
    setFinalObject(object);
  }

  function objectMapperArtist() {
    const object = {
      image: data?.artistCover,
      title: data?.title,
      extraInfo: data?.popularity,
    };
    setFinalObject(object);
  }

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.image }} size={"sm"} alt="Ilustration" />
      <View style={styles.details}>
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
        <Text style={styles.subtitle}>{item.popularity}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={finalObject}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}
