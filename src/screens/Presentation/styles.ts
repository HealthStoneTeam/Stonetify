import { StyleSheet } from "react-native";
import { COLORS, FONTS, SPACING } from "../../models/constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.medium,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
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
  textTitleList: {
    color: COLORS.white,
    fontSize: FONTS.mediumLarge,
    textAlign: "center",
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
  appIconContainer: {
    flexDirection: "row",
    alignItems: "center",
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
  logoSpotify: {
    width: 130,
    height: 39,
    marginVertical: SPACING.medium,
    alignSelf: "center",
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
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.medium,
  },
  switchLabel: {
    color: COLORS.white,
    fontSize: FONTS.medium,
    marginRight: SPACING.small,
  },
});

export default styles;
