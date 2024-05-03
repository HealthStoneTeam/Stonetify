//Fazer a chamada do perfil e das músicas
import { getProfileFromAPI, getTopItemsFromAPI } from "../services/user/index";

export async function getProfile(getAccessToken) {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      throw new Error(I18n.t("errorGetAccessToken"));
    }
    const profileRaw = await getProfileFromAPI(accessToken);
    if (profileRaw) {
      userInfo = await extractUserInfo(profileRaw);

      return userInfo;
    } else {
      throw new Error(I18n.t("errorExtractUserData"));
    }
  } catch (error) {
    console.error(I18n.t("errorGetUserProfile"), ":", error.message);
    return null;
  }
}

export async function getTopItems(getAccessToken, filterData) {
  try {
    const accessToken = await getAccessToken();
    if (!filterData) {
      throw new Error(I18n.t("errorFilterUserData"));
    }
    if (!accessToken) {
      throw new Error(I18n.t("errorGetAccessToken"));
    }
    const { type, range, limit, offset } = filterData;

    topItemsRaw = await getTopItemsFromAPI(
      accessToken,
      type,
      range,
      limit,
      offset
    );
    if (topItemsRaw) {
      if (type === "artists") {
        artistsInfo = extractArtistsInfo(topItemsRaw);
        return { data: artistsInfo, type };
      } else if (type === "tracks") {
        tracksInfo = extractTracksInfo(topItemsRaw);
        return { data: tracksInfo, type };
      } else {
        throw new Error(I18n.t("errorExtractUserData"));
      }
    }
  } catch (error) {
    console.error(I18n.t("errorGetUserTopItems"), ":", error.message);
    return null;
  }
}

function extractUserInfo(jsonData) {
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

function extractArtistsInfo(jsonData) {
  const artistInfo = [];

  if (jsonData && jsonData.items && Array.isArray(jsonData.items)) {
    jsonData.items.forEach((item, index) => {
      const title = item.name || "";
      const uri = item.uri;
      const link = item.external_urls.spotify;
      const extraInfo = item.popularity || 0;
      const image = getCover(item);

      artistInfo.push({
        id: index + 1,
        title,
        extraInfo,
        image,
        uri,
        link,
      });
    });
  }

  return artistInfo;
}

function extractTracksInfo(jsonData) {
  const trackInfo = [];

  if (jsonData && jsonData.items && Array.isArray(jsonData.items)) {
    jsonData.items.forEach((item, index) => {
      const title = item.name || "";
      const uri = item.uri;
      const link = item.external_urls.spotify;
      const subtitle = item.artists
        ? item.artists.map((artist) => artist.name).join(", ")
        : "";
      const extraInfo = item.duration_ms
        ? millisecondsToMinutesAndSeconds(item.duration_ms)
        : "";
      const image = getCover(item.album);

      trackInfo.push({
        id: index + 1,
        title,
        subtitle,
        extraInfo,
        image,
        uri,
        link,
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

function getCover(cover) {
  let largestImage = null;

  if (
    cover &&
    cover.images &&
    Array.isArray(cover.images) &&
    cover.images.length > 0
  ) {
    largestImage = cover.images.reduce((prevImage, currentImage) => {
      if (prevImage.height < currentImage.height) {
        return currentImage;
      }
      return prevImage;
    });
  }
  return largestImage ? largestImage.url : null;
}
