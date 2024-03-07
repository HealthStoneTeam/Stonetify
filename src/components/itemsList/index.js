import React from "react";
import styles from "./styles";
import { View, FlatList, Text } from "react-native";
import { Image } from "native-base";

export default function ItemsList({ data }) {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.albumCover }} size={"sm"} alt="Ilustration" />
      <View style={styles.details}>
        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.artist}</Text>
        </View>
        <Text style={styles.subtitle}>{item.time}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}
