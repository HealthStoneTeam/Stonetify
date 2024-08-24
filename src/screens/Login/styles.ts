import { StyleSheet } from "react-native";
import { COLORS, FONTS, SPACING } from "../../models/constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: SPACING.large,
  },
  loginButton: {
    backgroundColor: COLORS.primary,
    padding: SPACING.medium,
    borderRadius: SPACING.large,
    width: "80%",
    alignItems: "center",
    marginBottom: SPACING.medium,
  },
  aboutButton: {
    borderColor: COLORS.primary,
    borderWidth: 2,
    padding: SPACING.medium,
    borderRadius: SPACING.large,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.white,
    fontSize: FONTS.medium,
  },
  watermarkContainer: {
    position: "absolute",
    bottom: SPACING.small,
    left: 0,
    right: 0,
    alignItems: "center",
  }
});
