import React from "react";
import { View } from "react-native";
import I18n from "../../../translations";
import { Filters } from "../../models/enums/filters";
import { DropdownItemProps } from "../../models/types/dropdown";
import { FilterModeProps } from "../../models/types/filterModes";
import { GenericDataProps } from "../../models/types/genericData";
import Dropdown from "../dropdown";
import styles from "./styles";

export default function FilterModes({
  data,
}: GenericDataProps<FilterModeProps>) {

  const modeOptions = [
    {
      value: Filters.NORMAL_MODE,
      label: I18n.t("normalMode"),
    },
    {
      value: Filters.LITE_MODE,
      label: I18n.t("liteMode"),
    },
  ];

  return (
    <View style={styles.filterSection}>
      <Dropdown
        data={{
          options: modeOptions,
          selected: data.selected,
          onSelect: (option: DropdownItemProps) =>
            data.setMode(option.value),
        }}
      />
    </View>
  );
}
