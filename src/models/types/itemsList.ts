import { Filters } from "../enums/filters";
import { Items } from "./items";

export type ItemsListProps = {
  showSpotify: boolean;
  items: Items[];
  mode: string;
  type: Filters;
};
