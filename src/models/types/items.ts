export type ItemsProps = {
  showSpotify: boolean,
  item: Items,
  showImages: boolean
}

export type Items = {
  image: string,
  title: string,
  subtitle: string,
  extraInfo: string,
  uri: string,
  link: string
}