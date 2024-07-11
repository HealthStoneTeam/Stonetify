export type ItemsProps = {
  showSpotify: boolean,
  item: Items
}

export type Items = {
  image: string,
  title: string,
  subtitle: string,
  extraInfo: string,
  uri: string,
  link: string
}