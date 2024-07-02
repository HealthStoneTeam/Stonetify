import { StyleSheet } from "react-native";
import { COLORS, SPACING, FONTS } from "../../constants";

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.extraSmall,
    columnGap: SPACING.extraSmall,
  },
  details: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: FONTS.medium,
    fontWeight: "bold",
    color: COLORS.white,
    flexShrink: 1,
  },
  subtitle: {
    fontSize: FONTS.smallMedium,
    color: COLORS.gray,
  },
  containerSpotify: {
    flexDirection: "row",
    columnGap: 5,
    alignItems: "center",
  },
  iconSpotify: {
    width: 15,
    height: 15,
  },
  textSpotify: {
    fontSize: FONTS.medium,
    color: COLORS.white,
  },
});

export default styles;
