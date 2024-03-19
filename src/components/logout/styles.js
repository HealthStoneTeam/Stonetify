import { StyleSheet } from "react-native";

export default StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "#282828",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    elevation: 5,
  },
  modalText: {
    color: "white",
    marginBottom: 20,
    textAlign: "center",
    fontSize: 18,
  },
  containerButtons: {
    flexDirection: "row",
    columnGap: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 100,
    alignItems: "center",
  },
  confirmButton: {
    backgroundColor: "#1DB954",
  },
  cancelButton: {
    borderColor: "#1DB954",
    borderWidth: 2,
    borderRadius: 25,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
