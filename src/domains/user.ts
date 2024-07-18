import { getProfileFromAPI, getTopItemsFromAPI } from "../services/user";

import { ErrorAuthenticating, ErrorGetting } from "../errors";
import { ArtistInfo, CoverProps, ExtractArtistsInfoProps, extractTracksInfoProps, ExtractUserInfoProps, TopItemsProps, TrackInfo } from "../models/types/user";

export async function getProfile(getAccessToken: Function) {
  try {
    const accessToken = await getAccessToken();
    if (!accessToken) {
      throw new ErrorAuthenticating();
    }
    const profileRaw = await getProfileFromAPI(accessToken);
    if (profileRaw) {
      const userInfo = await extractUserInfo(profileRaw);

      return userInfo;
    } else {
      throw new ErrorAuthenticating();
    }
  } catch (error) {
    throw new ErrorAuthenticating();
  }
}

export async function getTopItems({ getAccessToken, filterData }: TopItemsProps) {
  const accessToken = await getAccessToken();
  if (!filterData || !accessToken) {
    throw new ErrorAuthenticating();
  }

  try {
    const { type, range, limit, offset } = filterData;

    const topItemsRaw = await getTopItemsFromAPI({
      accessToken,
      type,
      range,
      limit,
      offset
  });

    if (type === "artists") {
      const artistsInfo = extractArtistsInfo(topItemsRaw);
      return { data: artistsInfo, type };
    } else if (type === "tracks") {
      const tracksInfo = extractTracksInfo(topItemsRaw);
      return { data: tracksInfo, type };
    } else {
      throw new ErrorGetting();
    }
  } catch (error) {
    throw new ErrorGetting();
  }
}

function extractUserInfo(data: ExtractUserInfoProps) {
  const { display_name, id, images } = data;
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

function extractArtistsInfo(data: ExtractArtistsInfoProps) {
  const artistInfo: ArtistInfo = [];

  if (data && data.items && Array.isArray(data.items)) {
    data.items.forEach((item, index) => {
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
        subtitle: ""
      });
    });
  }

  return artistInfo;
}

function extractTracksInfo(data: extractTracksInfoProps) {
  const trackInfo: TrackInfo = [];

  if (data && data.items && Array.isArray(data.items)) {
    data.items.forEach((item, index) => {
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

function millisecondsToMinutesAndSeconds(ms: number) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

function getCover(cover: CoverProps) {
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
