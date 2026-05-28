import { StyleSheet } from "react-native";
import { COLORS, SPACING, FONTS } from "../../models/constants";

const styles = StyleSheet.create({
  username: {
    color: COLORS.white,
    fontSize: FONTS.mediumLarge,
    alignSelf: "flex-end",
    marginBottom: SPACING.medium,
    marginLeft: SPACING.medium,
    fontWeight: "normal",
    maxWidth: 190,
  },
  avatar: {
    flexDirection: "row",
    flex: 1,
  },
});

export default styles;
