import { StyleSheet } from "react-native";
import { COLORS, FONTS, SPACING } from "../../models/constants";

const styles = StyleSheet.create({
  container: {
    width: "100%",
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
});

export default styles;
