import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";


export default function App() {
  const [topT, setTopT] = useState("")
  useEffect(() => {
    pre_gambs();
  }, []);

  const clientId = "68028a1d5ff847c694cfb49e4dfd4fb7"; // Replace with your client ID
  const params = new URLSearchParams(window.location.search);
  let code = params.get("code");
  // let code = localStorage.getItem("code");
  console.log("Code1", code)

  async function pre_gambs() {
    let accessToken = undefined;
    
    if (!code) {
      redirectToAuthCodeFlow(clientId);
      console.log("Lops tá loko")
      // code = params.get("code");
      // localStorage.setItem("code", code);
    } else {
      console.log("Passou aqui mano", code )
      accessToken = await getAccessToken(clientId, code);
      // const profile = await fetchProfile(accessToken);
      // populateUI(profile);
    }
    console.log("LOTR", accessToken)
    if (accessToken)
      gambs(accessToken);

  }

  async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:8081/callback"); //com.healthstone.SpotStats://callback
    params.append("scope", "user-read-private user-read-email user-top-read");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
    
  }

  function generateCodeVerifier(length) {
    let text = "";
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  async function getAccessToken(clientId, code) {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "com.healthstone.SpotStats://callback");
    params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    return access_token;
}

  async function fetchProfile(token) {
    // TODO: Call Web API
  }

  function populateUI(profile) {
    // TODO: Update UI with profile data
  }

  async function gambs(
    token = "BQCVEvqMXEsw_30IdDEOnBoFKGfsSnwafynWkI7ER30o2H5AtPPe_Rozxef67x7-J0JwcSktHYFv4MElfOiJJoDMU8npG_NeiKTm61F0Y5xrZvtKmgT0DTMIJlUrByr9pqsvzAyx_VBvi4nhu7l7dwNGfJudF-2MjrZvntR2BzL87RqycATdgVvoK3rcGtbCcTJJsAfU1Xu1M0BN2GaSmI2ILLVPOwSxjp0l7RVqsRaVRbj5RwnMiacZnv2tBiBdQ0g"
  ) {
    console.log("TOKEN",token)
    async function fetchWebApi(endpoint, method, body) {
      const res = await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        method,
        body: JSON.stringify(body),
      });
      return await res.json();
    }

    async function getTopTracks() {
      // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
      return (
        await fetchWebApi(
          "v1/me/top/tracks?time_range=long_term&limit=5",
          "GET"
        )
      ).items;
    }

    const topTracks = await getTopTracks();
    setTopT(topTracks?.map(
      ({ name, artists }) =>
        `${name} by ${artists.map((artist) => artist.name).join(", ")}`
    ))
    console.log(
      topTracks?.map(
        ({ name, artists }) =>
          `${name} by ${artists.map((artist) => artist.name).join(", ")}`
      )
    );
  }

  return (
    <View style={styles.container}>
      <Text>{topT}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
