import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable } from "react-native";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../config/auth";
import { getProfileFromAPI, getTopItemsFromAPI } from "../../services/user/index";

export default function Login() {
  const { authenticate, logout, getAccessToken } =
    useContext(AuthContext);
    const [accessToken, setAccessToken] = useState();
  

  //TODO Se tiver o token vai pra próxima tela, se não vai pra tela de login
  useEffect(() => {
    async function teste(){
      setAccessToken(await getAccessToken());
      console.log("Chegou aqui", accessToken);
    }
    teste()
    
  },[]);
  //

  async function logoutFromScreen(){
    await logout()
    setAccessToken()
  }

  async function perfil(){
  console.log("qual foi", accessToken)
  console.log("perfilzin", await getProfileFromAPI(accessToken))
  }
  
  async function topzeira(){
  console.log("100% Jesus", accessToken)
  console.log("Deus é TOP", await getTopItemsFromAPI(accessToken, "artists", "long_term", "10", "0"))
  }

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
        onPress={logoutFromScreen}
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
      <Text style={{ color: "#FFF" }}>METE A CARA</Text>
      <Pressable
        onPress={perfil}
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
        <Text>VAI APARECER?</Text>
      </Pressable>
      <StatusBar style="auto" />

      <Text style={{ color: "#FFF" }}>QUAL A TUA</Text>
      <Pressable
        onPress={topzeira}
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
        <Text>VAI SE EXIBIR?</Text>
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
