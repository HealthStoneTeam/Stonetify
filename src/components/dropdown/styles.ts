import { StyleSheet } from "react-native";
import { COLORS, SPACING, FONTS } from "../../models/constants";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    rowGap: SPACING.extraSmall,
  },
  selectField: {
    backgroundColor: COLORS.darkGray,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: COLORS.gray,
    padding: SPACING.extraSmall,
    paddingHorizontal: SPACING.large,
    width: "100%",
    borderRadius: SPACING.extraSmall,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  textSelectField: {
    color: COLORS.white,
    fontSize: FONTS.medium,
  },
  optionsField: {
    backgroundColor: COLORS.darkGray,
    borderWidth: 1,
    borderRadius: SPACING.extraSmall,
    borderStyle: "solid",
    borderColor: COLORS.gray,
    padding: SPACING.extraSmall,
    width: "100%",
    marginTop: 0,
  },
  textOptionsField: {
    color: COLORS.white,
    padding: SPACING.extraSmall,
    fontSize: FONTS.medium,
  },
});

export default styles;