//Fazer a chamada do perfil e das músicas
import { getProfileFromAPI, getTopItemsFromAPI } from "../services/user/index";

export async function getProfile(getAccessToken) {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      return null;
    }
    profileRaw = await getProfileFromAPI(accessToken);
    if (profileRaw) {
      userInfo = await extractUserInfo(profileRaw);
      console.log(userInfo);
      return userInfo;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getTopItems(getAccessToken, filterData) {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken || !filterData) {
      return null;
    }
    const { type, range, limit, offset } = filterData;

    topItemsRaw = await getTopItemsFromAPI(
      accessToken,
      type,
      range,
      limit,
      offset
    );
    console.log(topItemsRaw);
    if (topItemsRaw) {
      // if ((type === "artists")) {
      //   artistsInfo = await extractArtistsInfo(topItemsRaw);
      //   console.log(artistsInfo);
      //   return artistsInfo;
      // } else
      if (type === "tracks") {
        tracksInfo = await extractTracksInfo(topItemsRaw);
        console.log(tracksInfo);
        return tracksInfo;
      } else {
        return null;
      }
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function extractUserInfo(jsonData) {
  const { display_name, id, images } = jsonData;
  let userImage;

  for (let i = 0; i < images.length; i++) {
    if (images[i].height === 300) {
      userImage = images[i].url;
      break;
    }
  }

  const userInfo = {
    username: display_name,
    userID: id,
    userImage: userImage,
  };

  return userInfo;
}

function extractTracksInfo(jsonData) {
  const trackInfo = [];

  if (jsonData && jsonData.items && Array.isArray(jsonData.items)) {
    jsonData.items.forEach((item, index) => {
      const title = item.name || "";
      const artist = item.artists
        ? item.artists.map((artist) => artist.name).join(", ")
        : "";
      const time = item.duration_ms
        ? millisecondsToMinutesAndSeconds(item.duration_ms)
        : "";
      const albumCover = getAlbumCover(item.album);

      trackInfo.push({
        id: index + 1,
        title,
        artist,
        time,
        albumCover,
      });
    });
  }

  return trackInfo;
}

function millisecondsToMinutesAndSeconds(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function getAlbumCover(album) {
  if (album && album.images && Array.isArray(album.images)) {
    for (let i = 0; i < album.images.length; i++) {
      if (album.images[i].height === 640) {
        return album.images[i].url;
      }
    }
  }
  return null;
}
