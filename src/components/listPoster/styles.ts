import { StyleSheet } from "react-native";
import { FONTS, SPACING } from "../../models/constants";

export default StyleSheet.create({
  poster: {
    width: "100%",
    borderWidth: 1,
    padding: SPACING.medium,
  },
  header: {
    alignItems: "center",
    marginTop: SPACING.extraSmall,
  },
  appMark: {
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SPACING.small,
    paddingVertical: 8,
  },
  appIcon: {
    width: 34,
    height: 34,
  },
  appName: {
    fontSize: FONTS.large,
    marginLeft: SPACING.extraSmall,
    fontWeight: "900",
  },
  titleList: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.large,
    rowGap: 6,
    paddingHorizontal: SPACING.small,
  },
  textTitleList: {
    fontSize: 25,
    lineHeight: 30,
    textAlign: "center",
    fontWeight: "900",
    textTransform: "uppercase",
  },
  textRange: {
    fontSize: FONTS.smallMedium,
    textAlign: "center",
    fontWeight: "800",
    textTransform: "uppercase",
  },
  listPanel: {
    borderWidth: 1,
    padding: SPACING.extraSmall,
    rowGap: 6,
  },
  listRow: {
    minHeight: 56,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.extraSmall,
    paddingVertical: 7,
  },
  rowNumber: {
    width: 30,
    fontSize: FONTS.small,
    fontWeight: "900",
  },
  imageBox: {
    width: 42,
    height: 42,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginRight: SPACING.extraSmall,
    overflow: "hidden",
  },
  itemImage: {
    width: "100%",
    height: "100%",
  },
  initials: {
    fontSize: FONTS.small,
    fontWeight: "900",
  },
  rowText: {
    flex: 1,
    minWidth: 0,
    marginRight: SPACING.extraSmall,
  },
  itemTitle: {
    fontSize: FONTS.medium,
    fontWeight: "900",
  },
  itemSubtitle: {
    fontSize: FONTS.small,
    marginTop: 2,
  },
  extraInfo: {
    minWidth: 38,
    maxWidth: 54,
    fontSize: FONTS.smallMedium,
    fontWeight: "900",
    textAlign: "right",
  },
  spotifyBadge: {
    alignSelf: "center",
    marginTop: SPACING.medium,
  },
});
