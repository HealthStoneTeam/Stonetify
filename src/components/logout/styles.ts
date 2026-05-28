import { StyleSheet } from "react-native";
import { COLORS, FONTS, SPACING } from "../../models/constants";

export default StyleSheet.create({
  logoutButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.62)",
    padding: SPACING.medium,
  },
  modalView: {
    width: "100%",
    maxWidth: 340,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 20,
    padding: SPACING.large,
    alignItems: "center",
    elevation: 5,
  },
  modalText: {
    color: COLORS.white,
    marginBottom: SPACING.large,
    textAlign: "center",
    fontSize: FONTS.medium,
    fontWeight: "800",
  },
  containerButtons: {
    flexDirection: "row",
    columnGap: SPACING.small,
  },
  button: {
    borderRadius: 20,
    paddingVertical: SPACING.small,
    paddingHorizontal: SPACING.medium,
    width: 112,
    alignItems: "center",
  },
  confirmButton: {
    backgroundColor: COLORS.primary,
  },
  cancelButton: {
    borderColor: COLORS.primary,
    borderWidth: 2,
    borderRadius: 25,
  },
  textStyle: {
    color: COLORS.white,
    fontWeight: "900",
    textAlign: "center",
    fontSize: FONTS.smallMedium,
  },
});
