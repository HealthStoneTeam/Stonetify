import React from "react";
import { View, TouchableOpacity, Linking, Text } from "react-native";
import Item from "../item";
import NotFound from "../notFound";
import { GenericDataProps } from "../../models/types/genericData";
import { ItemsListProps } from "../../models/types/itemsList";
import { Items } from "../../models/types/items";
import styles from "./styles";
import I18n from "../../../translations";
import { Filters } from "../../models/enums/filters";

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

  const renderItem = (item: Items, index: number) => (
    <TouchableOpacity onPress={() => redirectSpotify(item)} key={index}>
      <View style={styles.itemContainer}>
        <Text style={styles.itemNumber}>{index + 1}.</Text>
        <View style={styles.itemContent}>
          <Item
            data={{
              item: item,
              showSpotify: data.showSpotify,
              mode: data.mode,
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );

  return data.items?.length ? (
    <>
      {data.type === Filters.ARTISTS && (
        <Text style={styles.listColumnsTitle}>{I18n.t("popularity")}</Text>
      )}
      {data.items?.map((item, index) => renderItem(item, index))}
    </>
  ) : (
    <NotFound />
  );
}
