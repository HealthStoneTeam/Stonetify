import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import * as AppAuth from "expo-auth-session";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../config/auth";

export default function Login() {
  const { authenticate, logout, getAccessToken, renewAuthentication } =
    useContext(AuthContext);

  //TODO Se tiver o token vai pra próxima tela, se não vai pra tela de login
  useEffect(() => {
    async function teste(){
      const accessToken = await getAccessToken();
      console.log("Chegou aqui", accessToken);
    }
    teste()
    
  },[]);
  //
  return (
    <View style={styles.container}>
      <Text style={{ color: "#FFF" }}>CAI DENTRO</Text>
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
        <Text>VAI ENCARAR?</Text>
      </Pressable>
      <StatusBar style="auto" />
      <Text style={{ color: "#FFF" }}>CAI FORA</Text>
      <Pressable
        onPress={logout}
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
        <Text>VAI ARREGAR?</Text>
      </Pressable>
      <StatusBar style="auto" />
      <Text style={{ color: "#FFF" }}>CAI E LEVANTA</Text>
      <Pressable
        onPress={renewAuthentication}
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
        <Text>VAI DESISTIR?</Text>
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
