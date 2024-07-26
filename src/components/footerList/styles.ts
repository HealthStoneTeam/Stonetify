import { StyleSheet } from "react-native";
import { COLORS, SPACING } from "../../models/constants";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  appIconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  appIcon: {
    width: 50,
    height: 50,
  },
  appName: {
    fontSize: 28,
    color: COLORS.white,
    marginLeft: SPACING.extraSmall,
    fontWeight: "bold",
  },
  spotifyIconContainer: {
    marginLeft: SPACING.medium,
  },
  logoSpotify: {
    width: 130,
    height: 39,
    marginVertical: SPACING.medium,
    alignSelf: "center",
  },
});

export default styles;
