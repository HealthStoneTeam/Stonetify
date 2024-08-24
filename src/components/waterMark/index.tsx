import React from "react";
import { Text } from "react-native";
import styles from "./styles";
import I18n from "../../../translations";

export default function WaterMark() {

  return (
    <Text style={styles.watermarkText}>{I18n.t("madeBy")}</Text>
  );
}
