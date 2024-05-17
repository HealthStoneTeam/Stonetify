import { StyleSheet } from "react-native";
import { COLORS, SPACING, FONTS } from "../../constants";

export default StyleSheet.create({
  titleList: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: SPACING.large,
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
  containerShare: {
    flex: 1,
    width: "100%",
    alignItems: "flex-end",
  },
  container: {
    flex: 1,
    paddingHorizontal: SPACING.medium,
  },
  mainBg: {
    backgroundColor: COLORS.secondary,
  },
});
