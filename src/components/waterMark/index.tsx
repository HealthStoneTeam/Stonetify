import React from "react";
import { Text } from "react-native";
import styles from "./styles";
import i18n from "../../../translations";

export default function WaterMark() {

  return (
    <Text style={styles.watermarkText}>{i18n.t("madeBy")}</Text>
  );
}
