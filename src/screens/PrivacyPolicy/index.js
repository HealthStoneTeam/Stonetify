import { StyleSheet, Text, View } from "react-native";

export default function PrivacyPolicy() {
  return (
    <View style={styles.container}>
      <Text style={{ color: "#FFF" }}>TELA DE PRIVACY POLICY</Text>
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
