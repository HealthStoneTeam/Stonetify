import { DropdownItemProps } from "./dropdown";

export type TopItemsLimit = 5 | 10 | 20 | 50;

export type FilterProps = {
  type: DropdownItemProps;
  range: DropdownItemProps;
  limit: TopItemsLimit;
  onTypeSelect: (option: DropdownItemProps) => void;
  onRangeSelect: (option: DropdownItemProps) => void;
  onLimitSelect: (limit: TopItemsLimit) => void;
};
