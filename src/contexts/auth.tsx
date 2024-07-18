import {
  getAccessTokenFromAPI,
  getRefreshedTokenFromAPI,
  getAccessCodeFromAPI,
} from "../services/auth";
import { createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ErrorAuthenticating } from "../errors";
import { AuthContextProps, AccessCodeProps } from "../models/types/auth";
import { GenericDataProps } from '../models/types/genericData';

export const AuthContext = createContext<AuthContextProps>({});

if (!process.env.SPOTIFY_CLIENT_ID) { 
  throw new Error('ERRO AQUI'); // COLOCAR ERRO CERTO
}

const clientId = process.env.SPOTIFY_CLIENT_ID;

function AuthProvider({ children }) {
  async function authenticate() {
    const scopes = [
      "user-read-email",
      "user-library-read",
      "user-read-recently-played",
      "user-top-read",
      "playlist-read-private",
      "playlist-read-collaborative",
      "playlist-modify-public",
    ];
    const scheme = "stonetify";
    const path = "callback";

    const config : AccessCodeProps = {
      clientId,
      scopes,
      scheme,
      path }

    const accessCode = await getAccessCodeFromAPI( config );

    if (accessCode) {
      const objToken = await getAccessTokenFromAPI({
        clientId,
        code: accessCode.code,
        verifier: accessCode.codeVerifier,
        redirectUri: accessCode.redirectUri
      }
      );
      storeTokens(objToken);
      getStoredTokens();
      return true;
    }
  }

  async function logout() {
    await AsyncStorage.clear();
  }

  async function getAccessToken() {
    try {
      const tokensRaw = await getStoredTokens();
      if (
        tokensRaw &&
        tokensRaw.access_token &&
        tokensRaw.saved_time &&
        tokensRaw.refresh_token &&
        tokensRaw.expires_in
      ) {
        const accessToken = tokensRaw.access_token;
        const refreshToken = tokensRaw.refresh_token;
        const savedTime = tokensRaw.saved_time;
        const expirationTime = tokensRaw.expires_in;

        if (await validateAccessToken(savedTime, expirationTime)) {
          return accessToken;
        } else {
          const tokensRawRefreshed = await getRefreshedTokenFromAPI({
            clientId,
            refreshToken
          });
          if (
            tokensRawRefreshed &&
            tokensRawRefreshed.access_token &&
            tokensRawRefreshed.refresh_token &&
            tokensRawRefreshed.expires_in
          ) {
            storeTokens(tokensRawRefreshed);
            return tokensRawRefreshed.access_token;
          }
        }
      }
      return null;
    } catch (e) {
      throw new ErrorAuthenticating();
    }
  }

  async function validateAccessToken(savedTime, expirationTime) {
    const currentTime = new Date().getTime();
    const safeExpirationTime = Number(expirationTime) * 0.9;
    savedTime = new Date(savedTime).getTime();
    const differenceInSeconds = (currentTime - savedTime) / 1000;
    return safeExpirationTime >= differenceInSeconds;
  }

  const storeTokens = async (tokenData) => {
    const savedTime = new Date().toISOString();
    const tokenDataToStore = { ...tokenData, saved_time: savedTime };
    await AsyncStorage.setItem("tokens", JSON.stringify(tokenDataToStore));
  };

  const getStoredTokens = async () => {
    const jsonValue = await AsyncStorage.getItem("tokens");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  };

  return (
    <AuthContext.Provider
      value={{
        authenticate,
        logout,
        getAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
