import React from "react";
import { View, TouchableOpacity, Linking } from "react-native";
import Item from "../item";
import NotFound from "../notFound";

export default function ItemsList({ data, showSpotify }) {
  function redirectSpotify(item) {
    if (item.uri || item.link) {
      Linking.canOpenURL(item.uri).then((supported) => {
        if (supported) {
          Linking.openURL(item.uri);
        } else {
          Linking.openURL(item.link);
        }
      });
    }
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => redirectSpotify(item)}>
      <Item item={item} showSpotify={showSpotify} />
    </TouchableOpacity>
  );

  return data?.length ? (
    <>
      {data?.map((item, index) => (
        <View key={index}>{renderItem({ item, index })}</View>
      ))}
    </>
  ) : (
    <NotFound />
  );
}
