import { StyleSheet } from "react-native";
import { COLORS, FONTS, SPACING } from "../../models/constants";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.secondary,
    padding: SPACING.small,
  },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SPACING.small,
    padding: SPACING.medium,
    width: "90%",
    marginBottom: SPACING.small,
  },
  title: {
    color: COLORS.white,
    fontSize: FONTS.title,
    marginBottom: SPACING.small,
    textAlign: "left",
  },
  text: {
    color: COLORS.white,
    marginBottom: SPACING.large,
    fontSize: FONTS.large,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    color: COLORS.primary,
    textAlign: "center",
    fontSize: FONTS.large,
    marginBottom: SPACING.medium,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: SPACING.medium,
    padding: SPACING.small,
  },
  modalView: {
    margin: SPACING.medium,
    backgroundColor: COLORS.cardBackground,
    borderRadius: SPACING.medium,
    padding: SPACING.medium,
    alignItems: "center",
    shadowColor: COLORS.secondary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: SPACING.medium,
    color: COLORS.white,
    fontSize: FONTS.medium,
  },
  closeButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 28,
    padding: SPACING.small,
    elevation: 2,
    marginTop: SPACING.medium,
    width: "80%",
  },
  closeButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: FONTS.medium,
  },
});
