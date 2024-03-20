import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1DB954',
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    columnGap: 10,
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
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
    flexShrink: 1,
  },
  subtitle: {
    fontSize: 14,
    color: "#B3B3B3",
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  notFoundText: {
    fontSize: 16,
    color: "white",
  },
});

export default styles;
