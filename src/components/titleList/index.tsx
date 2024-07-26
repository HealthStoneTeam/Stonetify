import React from "react";
import { Text } from "react-native";
import I18n from "../../../translations";
import { GenericDataProps } from "../../models/types/genericData";
import { TitleListProps } from "../../models/types/titleList";
import styles from "./styles";

export default function TitleList({ data }: GenericDataProps<TitleListProps>) {
  return (
    <Text style={styles.textTitleList}>
      {I18n.t("shareTitle", {
        username: data.username,
        type: data.type,
      })}
    </Text>
  );
}
