export async function getProfileFromAPI(accessToken) {
  const response = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });
  return await response.json();
}

export async function getTopItemsFromAPI(
  accessToken,
  type,
  range,
  limit,
  offset
) {
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

  return await response.json();
}
