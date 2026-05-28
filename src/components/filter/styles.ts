import { StyleSheet } from "react-native";
import { COLORS, FONTS, SPACING } from "../../models/constants";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    rowGap: SPACING.small,
    marginTop: SPACING.medium,
  },
  primaryPanel: {
    rowGap: SPACING.large,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    columnGap: SPACING.small,
  },
  eyebrow: {
    color: COLORS.primary,
    fontSize: FONTS.small,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  title: {
    color: COLORS.white,
    fontSize: FONTS.large,
    fontWeight: "bold",
  },
  curiosityBadge: {
    borderColor: COLORS.primary,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: SPACING.extraSmall,
    paddingVertical: 4,
  },
  curiosityBadgeText: {
    color: COLORS.primary,
    fontSize: FONTS.small,
    fontWeight: "900",
  },
  filterBlock: {
    rowGap: 8,
  },
  label: {
    color: COLORS.gray,
    fontSize: FONTS.small,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  segmentedControl: {
    flexDirection: "row",
    columnGap: 8,
  },
  segmentButton: {
    flex: 1,
    minHeight: 42,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.darkGray,
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: SPACING.extraSmall,
    paddingHorizontal: SPACING.extraSmall,
  },
  segmentButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  segmentText: {
    color: COLORS.white,
    fontSize: FONTS.smallMedium,
    fontWeight: "800",
    textAlign: "center",
  },
  segmentTextActive: {
    color: COLORS.white,
    fontWeight: "900",
  },
  chipRow: {
    flexDirection: "row",
    columnGap: 8,
  },
  limitChip: {
    minWidth: 52,
    minHeight: 40,
    alignItems: "center",
    justifyContent: "center",
    borderColor: COLORS.gray,
    borderWidth: 1,
    borderRadius: SPACING.extraSmall,
    backgroundColor: COLORS.darkGray,
  },
  limitChipActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
  },
  limitChipCuriosity: {
    minWidth: 62,
  },
  limitChipText: {
    color: COLORS.white,
    fontSize: FONTS.medium,
    fontWeight: "900",
  },
  limitChipTextActive: {
    color: COLORS.white,
  },
  quantityHint: {
    color: COLORS.gray,
    fontSize: FONTS.small,
    lineHeight: 17,
  },
});

export default styles;
