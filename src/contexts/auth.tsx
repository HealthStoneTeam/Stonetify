import {
  getAccessTokenFromAPI,
  getRefreshedTokenFromAPI,
  getAccessCodeFromAPI,
} from "../services/auth";
import { createContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ErrorAuthenticating } from "../errors";

export const AuthContext = createContext({});
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

    const accessCode = await getAccessCodeFromAPI(
      clientId,
      scopes,
      scheme,
      path
    );

    if (accessCode) {
      const objToken = await getAccessTokenFromAPI(
        clientId,
        accessCode.code,
        accessCode.codeVerifier,
        accessCode.redirectUri
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
          const tokensRawRefreshed = await getRefreshedTokenFromAPI(
            clientId,
            refreshToken
          );
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
