import { StyleSheet, Text, View } from "react-native";

export default function Presentation() {
  return (
    <View style={styles.container}>
      <Text style={{ color: "#FFF" }}>TELA DE PRESENTATION</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
