import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  filterSection: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    rowGap: 20,
    marginTop: 20,
  },
  titleList: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 25,
  },
  textTitleList: {
    color: "#FFF",
    fontSize: 18,
  },
  loadMore: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  usarname: {
    color: "#FFF",
    fontSize: 14,
    alignSelf: "flex-end",
    marginBottom: 15,
    marginLeft: 5,
  },
  avatar: {
    flexDirection: "row",
  },
  searchButton: {
    backgroundColor: "#3A3E3B",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#6D6A6A",
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    width: 200,
  },
  textSearchButton: {
    color: "#FFF",
  },
  logoSpotify: {
    width: 130,
    height: 39,
    marginVertical: 10,
  },
  containerLogoSpotify: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default styles;
