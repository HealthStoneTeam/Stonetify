export type DropdownProps = {
  options: DropdownItemProps[];
  onSelect: Function;
};

export type DropdownItemProps = {
  label: string;
  value: string;
};

export type FilterOptions = {
  type: DropdownItemProps;
  range: DropdownItemProps;
};
