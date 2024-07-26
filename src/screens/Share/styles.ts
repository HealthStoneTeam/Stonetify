import { StyleSheet, StatusBar } from "react-native";
import { COLORS, SPACING, FONTS } from "../../models/constants";

export default StyleSheet.create({
  titleList: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.large,
    rowGap: 20,
    paddingHorizontal: 40,
  },
  textTitleList: {
    color: COLORS.white,
    fontSize: FONTS.mediumLarge,
    textAlign: "center",
  },
  shareButton: {
    position: "relative",
    alignSelf: "flex-end",
    top: (StatusBar.currentHeight ?? 0) + 5 + SPACING.large,
    zIndex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: SPACING.medium,
  },
  mainBg: {
    backgroundColor: COLORS.secondary,
  },
});
