export type DropdownProps = {
  options: DropdownItemProps[],
  onSelect: Function
}

export type DropdownItemProps = {
  value: string,
  keyValue: string
}

export type FilterOptions = {
  type: DropdownItemProps,
  range: DropdownItemProps
}