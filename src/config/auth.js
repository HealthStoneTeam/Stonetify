//Logica
import { getAccessToken } from "../services/auth";
import { createContext } from "react";
import * as AppAuth from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";


//TODO Terminar de fazer chamada refresh Token


export const AuthContext = createContext({});

function AuthProvider({ children }) {
  //TODO Fazer fallback
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
      const objToken = await getAccessToken(
        clientId,
        code,
        codeVerifier,
        redirectUri
      );
      console.log("alegria: ", objToken);
      storeAccessToken(objToken.access_token)
      getStoredAccessToken()
    }
  }

  async function logout(){
    console.log("Entrou no logout")
    storeAccessToken("")
    getStoredAccessToken()
  }

  const storeAccessToken = async (value) => {
    try {
      await AsyncStorage.setItem('access-token', value);

    } catch (e) {
      console.log(e)
    }
  };

  const getStoredAccessToken = async () => {
    try {
      const value = await AsyncStorage.getItem('access-token');
      if (value) {
        console.log("felicitations", value);
        return value;
      }
      else{
        console.log("Not so felicitations", value)
      }
    } catch (e) {
      console.log(e)
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authenticate,
        logout,
        getStoredAccessToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}



export default AuthProvider;
