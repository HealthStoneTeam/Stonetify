import React from "react";
import { View, TouchableOpacity, Linking } from "react-native";
import Item from "../item";
import NotFound from "../notFound";
import { GenericDataProps } from "../../models/types/genericData";
import { ItemsListProps } from "../../models/types/itemsList";
import { Items } from "../../models/types/items";

export default function ItemsList({ data }: GenericDataProps<ItemsListProps>) {

  function redirectSpotify(item: Items) {
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

  const renderItem = (item: Items) => (
    <TouchableOpacity onPress={() => redirectSpotify(item)}>
      <Item data={{
        item: item,
        showSpotify: data.showSpotify
      }} />
    </TouchableOpacity>
  );

  return data.items?.length ? (
    <>
      {data.items?.map((item, index) => (
        <View key={index}>{renderItem(item)}</View>
      ))}
    </>
  ) : (
    <NotFound />
  );
}
