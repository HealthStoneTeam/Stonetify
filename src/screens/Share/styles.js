import { StyleSheet, StatusBar } from "react-native";
import { COLORS, SPACING, FONTS } from "../../constants";

export default StyleSheet.create({
  titleList: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.large,
    rowGap: 20,
  },
  textTitleList: {
    color: COLORS.white,
    fontSize: FONTS.mediumLarge,
  },
  containerSpotify: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoSpotify: {
    width: 130,
    height: 39,
    marginVertical: SPACING.medium,
  },
  shareButton: {
    position: "relative",
    alignSelf: "flex-end",
    top: StatusBar.currentHeight + 5 + SPACING.large,
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
