import { StyleSheet } from "react-native";
import { COLORS, FONTS, SPACING } from "../../constants";

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
  logoSpotify: {
    width: 130,
    height: 39,
    marginVertical: SPACING.medium,
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
});

export default styles;
