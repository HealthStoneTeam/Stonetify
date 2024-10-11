import { StyleSheet } from "react-native";
import { COLORS, SPACING } from "../../models/constants";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.medium,
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
  appIcon: {
    width: wp("10%"),
    height: wp("10%"),
    resizeMode: "contain",
  },
  appName: {
    fontSize: wp("7%"),
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
    justifyContent: "space-between",
    width: "100%",
    paddingBottom: SPACING.large,
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
    fontSize: wp("5%"),
    color: COLORS.white,
    marginLeft: wp("1%"),
    fontWeight: "bold",
  },
});

export default styles;
