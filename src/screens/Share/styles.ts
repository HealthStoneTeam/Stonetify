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
  containerSpotify: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoSpotify: {
    width: 130,
    height: 39,
    marginVertical: SPACING.medium,
    marginLeft: SPACING.medium,
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
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  appIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
  spotifyIconContainer: {
    marginLeft: SPACING.medium,
  },
});