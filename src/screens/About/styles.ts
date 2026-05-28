import { StyleSheet } from "react-native";
import { COLORS, FONTS, SPACING } from "../../models/constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
    padding: SPACING.small,
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SPACING.small,
    padding: SPACING.medium,
    width: "90%",
    marginBottom: SPACING.small,
  },
  title: {
    color: COLORS.white,
    fontSize: FONTS.title,
    marginBottom: SPACING.small,
    textAlign: "left",
  },
  text: {
    color: COLORS.white,
    marginBottom: SPACING.large,
    fontSize: FONTS.large,
  },
  privacyButton: {
    alignItems: "center",
  },
  link: {
    color: COLORS.primary,
    textAlign: "center",
    fontSize: FONTS.large,
    marginBottom: SPACING.medium,
  },
});
