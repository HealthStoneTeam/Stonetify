import { StyleSheet } from "react-native";
import * as NB from "native-base";
import { COLORS, FONTS, SPACING } from '../../constants';

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
    fontSize: FONTS.large,
    marginBottom: SPACING.small,
    textAlign: "left",
  },
  text: {
    color: COLORS.white,
    marginBottom: SPACING.small,
    fontSize: FONTS.medium,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  linkText: {
    color: COLORS.white,
    textDecorationLine: "underline",
  },
  link: {
    color: COLORS.primary,
    textAlign: "center",
    fontSize: FONTS.medium,
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
    backgroundColor: "#282828",
    borderRadius: SPACING.medium,
    padding: SPACING.medium,
    alignItems: "center",
    shadowColor: "#000",
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
    textAlign: "left",
  },
  closeButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 28,
    padding: SPACING.small,
    elevation: 2,
    marginTop: SPACING.medium,
    width: 100,
  },
  closeButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: FONTS.large,
  },
});