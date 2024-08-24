export type TopItemsFromApiProps = {
  accessToken: string,
  type: string,
  range: string,
  limit: number,
  offset: number
}

export type TopItemsProps = {
  getAccessToken: Function,
  filterData: {
    type: string;
    range: string;
    limit: number;
    offset: number;
  }
}

export type ExtractUserInfoProps = {
  display_name: string;
  id: string;
  images: Image[];
}

export type ExtractArtistsInfoProps = {
  items: {
    id: string;
    name: string;
    images: Image;
    uri: string;
    external_urls: { spotify: string };
    popularity: number;
  }[];
}

export type ArtistInfo = {
  id: number;
  title: string;
  subtitle: string;
  extraInfo: number;
  image: string;
  uri: string;
  link: string;
}[]

export type extractTracksInfoProps = {
  items: {
    id: string;
    name: string;
    album: {
      name: string;
      images: Image;
    };
    artists: {
      name: string;
    }[];
    uri: string;
    external_urls: { spotify: string };
    popularity: number;
    duration_ms: number;
  }[];
}

export type TrackInfo = {
  id: number;
  title: string;
  subtitle: string;
  extraInfo: any;
  image: string;
  uri: any;
  link: any;
}[]

export type CoverProps = {
  id ?: string; 
  name ?: string; 
  images: Image;
  uri ?: string; 
  external_urls ?: { spotify: string; }; 
  popularity ?: number; 
}

type Image = {
  height: number;
  url: string;
  width: number;
}