import { ErrorAuthenticating, ErrorGetting } from "../../errors/errors";

export async function getProfileFromAPI(accessToken) {
  try {
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    if (!response.ok) {
      throw new ErrorAuthenticating();
    }
    return await response.json();
  } catch {
    throw new ErrorAuthenticating();
  }
}

export async function getTopItemsFromAPI(
  accessToken,
  type,
  range,
  limit,
  offset
) {
  try {
    /*
      Range: long_term, medium_term, short_term 
      limit: 0 - 50
      offset: 0 - 50
    */

    const uri = `https://api.spotify.com/v1/me/top/${type}?time_range=${range}&limit=${limit}&offset=${offset}`;

    const response = await fetch(uri, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    if (!response.ok) {
      throw new ErrorGetting();
    }

    return await response.json();
  } catch {
    throw new ErrorGetting();
  }
}
