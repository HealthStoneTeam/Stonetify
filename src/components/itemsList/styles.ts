import { StyleSheet } from "react-native";
import { COLORS, SPACING, FONTS } from "../../models/constants";

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemNumber: {
    fontSize: FONTS.smallMedium,
    color: COLORS.white,
    minWidth: SPACING.large,
    marginRight: SPACING.small,
    textAlign: "center",
  },
  itemContent: {
    flex: 1,
  },
  listColumnsTitle: {
    alignSelf: "flex-end",
    fontSize: FONTS.medium,
    marginBottom: -20,
    color: COLORS.gray,
  },
});

export default styles;
