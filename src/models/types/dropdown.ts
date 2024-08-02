export type DropdownProps = {
  options: DropdownItemProps[];
  onSelect: Function;
  selected?: DropdownItemProps;
};

export type DropdownItemProps = {
  label: string;
  value: string;
};

export type FilterOptions = {
  type: DropdownItemProps;
  range: DropdownItemProps;
};
