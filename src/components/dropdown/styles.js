import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "100%",
    rowGap: 10,
  },
  selectField: {
    backgroundColor: "#3A3E3B",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#6D6A6A",
    padding: 10,
    paddingHorizontal: 20,
    width: "100%",
    borderRadius: 10,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  textSelectField: {
    color: "#FFF",
    fontSize: 16,
  },
  optionsField: {
    backgroundColor: "#3A3E3B",
    borderWidth: 1,
    borderRadius: 10,
    borderStyle: "solid",
    borderColor: "#6D6A6A",
    padding: 10,
    width: "100%",
    marginTop: 0,
  },
  textOptionsField: {
    color: "#FFF",
    padding: 10,
    fontSize: 16,
  },
});

export default styles;
