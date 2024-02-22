import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import * as AppAuth from "expo-auth-session";

export default function App() {
  async function authenticate() {
    const discorery = await AppAuth.fetchDiscoveryAsync(
      "https://accounts.spotify.com"
    );
    const clientId = "68028a1d5ff847c694cfb49e4dfd4fb7";
    const config = {
      clientId: clientId,
      scopes: [
        "user-read-email",
        "user-library-read",
        "user-read-recently-played",
        "user-top-read",
        "playlist-read-private",
        "playlist-read-collaborative",
        "playlist-modify-public", // or "playlist-modify-private"
      ],
      redirectUri: AppAuth.makeRedirectUri({
        scheme: "spotstats",
        path: "callback",
      }),
    };
    const request = await AppAuth.loadAsync(config, discorery);
    console.log("construção do primeiro request: ", request);
    const result = await request.promptAsync();
    console.log("resultado primeiro request: ", result);
    if (result.params.code) {
      const code = result.params.code;
      const { redirectUri, codeVerifier } = request;
      console.log("O code ta na mão: ", code);
      const tokenzin = await getAccessToken(
        clientId,
        code,
        codeVerifier,
        redirectUri
      );
      console.log("alegria: ", tokenzin);
    }
  }

  async function getAccessToken(clientId, code, verifier, redirectUri) {
    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", redirectUri);
    params.append("code_verifier", verifier);
    console.log("parametros: ", params.toString());

    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    return await result.json();
  }

  return (
    <View style={styles.container}>
      <Text style={{ color: "#FFF" }}>ALOOOWWW</Text>
      <Pressable
        onPress={authenticate}
        style={{
          backgroundColor: "#1DB954",
          padding: 10,
          marginLeft: "auto",
          marginRight: "auto",
          width: 300,
          borderRadius: 25,
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 10,
        }}
      >
        <Text>ALGUMA COISA</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
