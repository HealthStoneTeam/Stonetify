import { Filters } from "../enums/filters";

export type DropdownProps = {
  options: DropdownItemProps[];
  onSelect: Function;
  selected?: DropdownItemProps;
};

export type DropdownItemProps = {
  label: string;
  value: Filters;
};

export type FilterOptions = {
  type: DropdownItemProps;
  range: DropdownItemProps;
};
