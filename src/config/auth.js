//Logica
import { getAccessTokenFromAPI, getRefreshedTokenFromAPI } from "../services/auth";
import { createContext } from "react";
import * as AppAuth from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";


//TODO Refatorar a chamada para ir para a camada de service


export const AuthContext = createContext({});
const clientId = "68028a1d5ff847c694cfb49e4dfd4fb7";

function AuthProvider({ children }) {
  //TODO Fazer fallback
  async function authenticate() {
    const discorery = await AppAuth.fetchDiscoveryAsync(
      "https://accounts.spotify.com"
    );
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
      const objToken = await getAccessTokenFromAPI(
        clientId,
        code,
        codeVerifier,
        redirectUri
      );
      console.log("alegria: ", objToken);
      storeTokens(objToken);
      getStoredTokens();
      storeAccessToken(objToken.access_token)
    }
  }

  async function renewAuthentication(){
    // const refreshToken = await getStoredRefreshToken()
    // console.log('LLULULUUL', await getRefreshedTokenFromAPI(clientId,refreshToken));
    // console.log("Return???", refreshToken)
  }

  async function logout(){
    console.log("Entrou no logout")
    storeTokens({})
  }

  async function getAccessToken(){
    try{
      const tokensRaw = await getStoredTokens()
      if (tokensRaw && tokensRaw.access_token && tokensRaw.saved_time && tokensRaw.refresh_token && tokensRaw.expires_in){
        const accessToken = tokensRaw.access_token;
        const refreshToken = tokensRaw.refresh_token;
        const savedTime = tokensRaw.saved_time;
        const expirationTime = tokensRaw.expires_in;

        if (await validateAccessToken(savedTime, expirationTime)){
          console.log("Deu Nice", accessToken)
          return accessToken;
        } else {
          const tokensRawRefreshed = await getRefreshedTokenFromAPI(clientId,refreshToken);
          if (tokensRawRefreshed && tokensRawRefreshed.access_token && tokensRawRefreshed.refresh_token && tokensRawRefreshed.expires_in){
            storeTokens(tokensRawRefreshed)
            console.log("Deu refresh ok", tokensRawRefreshed.access_token)
            return tokensRawRefreshed.access_token
          }
        }
      }
      console.log("Deu mal")
      return null
    } catch (e) {
      console.log(e)
    }
    
  }

  async function validateAccessToken(savedTime,expirationTime){
    const currentTime = new Date().getTime();
    const safeExpirationTime = Number(expirationTime)  * 0.9
    savedTime = new Date(savedTime).getTime();
    const differenceInSeconds = (currentTime - savedTime) / 1000;
    console.log(differenceInSeconds)
    return (safeExpirationTime >= differenceInSeconds)
  }

  
  const storeTokens = async (tokenData) => {
    try {
      const savedTime = new Date().toISOString();
      const tokenDataToStore = { ...tokenData, 'saved_time': savedTime };
      console.log("Tokenzada", tokenDataToStore)
      await AsyncStorage.setItem('tokens', JSON.stringify(tokenDataToStore));

    } catch (e) {
      console.log(e)
    }
  };

  const getStoredTokens = async () => {
    try {
      const jsonValue  = await AsyncStorage.getItem('tokens');
      if (jsonValue ) {
        console.log("felicitations", jsonValue );
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      }
      else{
        console.log("Not so felicitations", jsonValue )
      }
    } catch (e) {
      console.log(e)
    }
  };

  const storeAccessToken = async (value) => {
    try {
      await AsyncStorage.setItem('access-token', value);

    } catch (e) {
      console.log(e)
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authenticate,
        logout,
        renewAuthentication,
        getAccessToken
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}



export default AuthProvider;
