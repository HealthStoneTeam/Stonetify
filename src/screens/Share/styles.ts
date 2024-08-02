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
  container: {
    flex: 1,
    paddingHorizontal: SPACING.medium,
  },
  mainBg: {
    backgroundColor: COLORS.secondary,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: SPACING.medium,
  },
  appIcon: {
    width: 50,
    height: 50,
  },
  appName: {
    fontSize: 28,
    color: COLORS.white,
    marginLeft: SPACING.extraSmall,
    fontWeight: "bold",
  },
  appIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
