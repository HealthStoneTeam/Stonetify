import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
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
  containerSpotify: {
    flexDirection: "row",
    columnGap: 5,
    alignItems: "center",
  },
  iconSpotify: {
    width: 15,
    height: 15,
  },
  textSpotify: {
    fontSize: 16,
    color: "#FFF",
  },
});

export default styles;
