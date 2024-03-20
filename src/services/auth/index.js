import * as AppAuth from "expo-auth-session";

//Chamadas
//TODO Fazer fallback

export async function getAccessCodeFromAPI(clientId, scopes, scheme, path) {
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
  const result = await request.promptAsync();
  if (result.params.code) {
    const code = result.params.code;
    const { redirectUri, codeVerifier } = request;
    return { code, redirectUri, codeVerifier }
    
  }
}


export async function getAccessTokenFromAPI(clientId, code, verifier, redirectUri) {
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

export async function getRefreshedTokenFromAPI(clientId, refreshToken) {
  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "refresh_token");
  params.append("refresh_token", refreshToken);
  console.log("parametros: ", params.toString());

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  return await result.json();
}


