import { StyleSheet } from "react-native";
import { COLORS, SPACING, FONTS } from "../../constants";

const styles = StyleSheet.create({
  username: {
    color: COLORS.white,
    fontSize: FONTS.mediumLarge,
    alignSelf: "flex-end",
    marginBottom: SPACING.medium,
    marginLeft: SPACING.medium,
  },
  avatar: {
    flexDirection: "row",
  },
});

export default styles;
