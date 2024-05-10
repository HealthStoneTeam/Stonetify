import React from "react";
import { Text } from "react-native";
import styles from "./styles";
import I18n from "../../../translations";
import { SafeAreaView } from "react-native-safe-area-context";

const NotFound = () => {
  return (
    <SafeAreaView style={styles.notFoundContainer}>
      <Text style={styles.notFoundText}>{I18n.t("noDataFound")}</Text>
    </SafeAreaView>
  );
};

export default NotFound;
