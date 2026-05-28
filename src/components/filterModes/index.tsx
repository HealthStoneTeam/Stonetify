import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import I18n from "../../../translations";
import { Filters } from "../../models/enums/filters";
import { DropdownItemProps } from "../../models/types/dropdown";
import { FilterModeProps } from "../../models/types/filterModes";
import { GenericDataProps } from "../../models/types/genericData";
import styles from "./styles";

type Option = DropdownItemProps;

export default function FilterModes({
  data,
}: GenericDataProps<FilterModeProps>) {

  const modeOptions: Option[] = [
    {
      value: Filters.NORMAL_MODE,
      label: I18n.t("normalMode"),
    },
    {
      value: Filters.LITE_MODE,
      label: I18n.t("liteMode"),
    },
  ];

  function renderSegment(
    option: Option,
    selectedValue: string,
    onPress: (option: Option) => void
  ) {
    const isSelected = selectedValue === option.value;

    return (
      <TouchableOpacity
        key={option.value}
        style={[styles.segmentButton, isSelected && styles.segmentButtonActive]}
        onPress={() => onPress(option)}
      >
        <Text
          style={[styles.segmentText, isSelected && styles.segmentTextActive]}
          numberOfLines={1}
          adjustsFontSizeToFit
        >
          {option.label}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.segmentedControl}>
        {modeOptions.map((option) =>
          renderSegment(option, data.selected.value, (opt) => data.setMode(opt.value))
        )}
      </View>
    </View>
  );
}
