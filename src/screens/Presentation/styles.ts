import { StyleSheet } from "react-native";
import { COLORS, FONTS, SPACING } from "../../models/constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.medium,
  },
  filterSection: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    rowGap: SPACING.large,
    marginTop: SPACING.large,
  },
  titleList: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.large,
  },
  searchButton: {
    backgroundColor: COLORS.darkGray,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: COLORS.gray,
    padding: SPACING.extraSmall,
    borderRadius: SPACING.large,
    alignItems: "center",
    justifyContent: "center",
    width: 200,
  },
  textSearchButton: {
    color: COLORS.white,
  },
  containerLogoSpotify: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  mainBg: {
    backgroundColor: COLORS.secondary,
  },
  shareButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    padding: SPACING.extraSmall,
    borderRadius: SPACING.extraSmall,
  },
  shareButtonText: {
    color: COLORS.white,
    fontSize: FONTS.large,
  },
});

export default styles;
