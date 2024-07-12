import * as AppAuth from "expo-auth-session";
import { AccessCodeProps, AccessTokenProps, RefreshedTokenProps } from '../../models/types/auth';

export async function getAccessCodeFromAPI( data : AccessCodeProps ) {

  const { clientId, scopes, scheme, path } = data
  const discorery = await AppAuth.fetchDiscoveryAsync(
    "https://accounts.spotify.com"
  );
  const config = {
    clientId,
    scopes,
    redirectUri: AppAuth.makeRedirectUri({
      scheme,
      path,
    }),
  };
  const request = await AppAuth.loadAsync(config, discorery);
  const result = await request.promptAsync(discorery); //VERIFICAR  
  if (result.type === "success" && result.params && result.params.code) {
    const code = result.params.code;
    const redirectUri = request.redirectUri || "";
    const codeVerifier = request.codeVerifier || "";
    return { code, redirectUri, codeVerifier };
  }
  return null;
}

export async function getAccessTokenFromAPI( data : AccessTokenProps ) {

  const {clientId, code, verifier, redirectUri } = data
  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", redirectUri);
  params.append("code_verifier", verifier);

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  return await result.json();
}

export async function getRefreshedTokenFromAPI( data : RefreshedTokenProps) {

  const { clientId, refreshToken } = data;
  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "refresh_token");
  params.append("refresh_token", refreshToken);

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  return await result.json();
}
