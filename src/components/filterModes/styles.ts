import { StyleSheet } from "react-native";
import { SPACING } from "../../models/constants";

const styles = StyleSheet.create({
  filterSection: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    rowGap: SPACING.large,
  },
});

export default styles;
