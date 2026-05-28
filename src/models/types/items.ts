export type ItemsProps = {
  showSpotify: boolean,
  item: Items,
  mode: string
}

export type Items = {
  id?: number,
  image?: string | null,
  title: string,
  subtitle: string,
  extraInfo: string | number,
  uri: string,
  link: string,
  spotifyId?: string,
  genres?: string[],
  popularity?: number
}
