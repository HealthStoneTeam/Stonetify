import { StyleSheet } from "react-native";
import { COLORS, FONTS, SPACING } from "../../models/constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.medium,
  },
  mainBg: {
    backgroundColor: COLORS.secondary,
  },
  editorHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    columnGap: SPACING.medium,
    marginBottom: SPACING.medium,
  },
  editorEyebrow: {
    color: COLORS.primary,
    fontSize: FONTS.small,
    fontWeight: "900",
    textTransform: "uppercase",
  },
  editorTitle: {
    color: COLORS.white,
    fontSize: FONTS.large,
    fontWeight: "900",
  },
  shareAction: {
    minHeight: 42,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: SPACING.extraSmall,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.medium,
    paddingVertical: SPACING.extraSmall,
  },
  shareActionText: {
    color: COLORS.white,
    fontSize: FONTS.smallMedium,
    fontWeight: "900",
  },
  controls: {
    borderWidth: 1,
    padding: SPACING.medium,
    rowGap: SPACING.medium,
    marginBottom: SPACING.medium,
  },
  sectionLabel: {
    fontSize: FONTS.small,
    fontWeight: "900",
    marginBottom: 8,
    textTransform: "uppercase",
  },
  segmentedControl: {
    flexDirection: "row",
    columnGap: SPACING.extraSmall,
  },
  segmentButton: {
    flex: 1,
    minHeight: 42,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SPACING.extraSmall,
  },
  segmentText: {
    fontSize: FONTS.smallMedium,
    fontWeight: "900",
    textAlign: "center",
  },
  themeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: SPACING.extraSmall,
    rowGap: SPACING.extraSmall,
  },
  themeCard: {
    width: "48%",
    minHeight: 64,
    borderWidth: 1,
    justifyContent: "space-between",
    padding: SPACING.extraSmall,
  },
  swatchRow: {
    flexDirection: "row",
    columnGap: 4,
  },
  swatch: {
    width: 22,
    height: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
  },
  themeLabel: {
    fontSize: FONTS.smallMedium,
    fontWeight: "900",
    marginTop: SPACING.extraSmall,
  },
  inlineControls: {
    flexDirection: "row",
    columnGap: SPACING.small,
    alignItems: "flex-end",
  },
  limitGroup: {
    flex: 1,
  },
  chipRow: {
    flexDirection: "row",
    columnGap: SPACING.extraSmall,
  },
  limitChip: {
    minWidth: 46,
    minHeight: 40,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SPACING.extraSmall,
  },
  limitChipText: {
    fontSize: FONTS.medium,
    fontWeight: "900",
  },
  imageToggle: {
    flex: 1,
    minHeight: 40,
    borderWidth: 1,
    paddingHorizontal: SPACING.extraSmall,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 6,
  },
  toggleText: {
    flexShrink: 1,
    fontSize: FONTS.smallMedium,
    fontWeight: "900",
  },
  festivalFields: {
    borderWidth: 1,
    padding: SPACING.small,
  },
  fieldRow: {
    flexDirection: "row",
    columnGap: SPACING.extraSmall,
    marginBottom: SPACING.extraSmall,
  },
  input: {
    flex: 1,
    minHeight: 42,
    borderWidth: 1,
    fontSize: FONTS.smallMedium,
    fontWeight: "700",
    padding: SPACING.extraSmall,
  },
  previewFrame: {
    width: "100%",
    paddingBottom: SPACING.large,
  },
  preview: {
    width: "100%",
    backgroundColor: COLORS.secondary,
  },
});
