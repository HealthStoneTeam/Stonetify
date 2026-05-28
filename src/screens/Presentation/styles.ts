import { StyleSheet } from "react-native";
import { COLORS, FONTS, SPACING } from "../../models/constants";
import { widthPercentageToDP } from "../../utils";

const wp = widthPercentageToDP;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.medium,
  },
  mainBg: {
    backgroundColor: COLORS.secondary,
  },
  titleList: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: SPACING.large,
    paddingBottom: SPACING.medium,
    rowGap: 6,
  },
  rangeSummary: {
    color: COLORS.gray,
    fontSize: FONTS.smallMedium,
    textAlign: "center",
  },
  appIcon: {
    width: wp("9%"),
    height: wp("9%"),
    resizeMode: "contain",
  },
  appName: {
    fontSize: wp("6%"),
    marginLeft: wp("2%"),
    color: COLORS.white,
    fontWeight: "bold",
  },
  appIconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingBottom: SPACING.medium,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: SPACING.small,
    paddingBottom: SPACING.small,
  },
  actionButton: {
    flex: 1,
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: SPACING.extraSmall,
    backgroundColor: COLORS.primary,
    padding: SPACING.extraSmall,
    borderRadius: SPACING.extraSmall,
  },
  festivalActionButton: {
    backgroundColor: COLORS.darkGray,
    borderColor: COLORS.gray,
  },
  shareButtonText: {
    flexShrink: 1,
    fontSize: wp("4.4%"),
    color: COLORS.white,
    fontWeight: "bold",
    textAlign: "center",
  },
  shareHint: {
    color: COLORS.gray,
    fontSize: FONTS.small,
    lineHeight: 17,
    textAlign: "center",
    marginBottom: SPACING.medium,
  },
  listCard: {
    backgroundColor: COLORS.secondary,
  },
});

export default styles;
