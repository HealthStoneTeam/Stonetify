import React from "react";
import { View } from "react-native";
import styles from "./styles";
import Dropdown from "../dropdown";
import i18n from "../../../translations";
import { DropdownItemProps, FilterOptions } from "../../models/types/dropdown";
import { GenericDataProps } from "../../models/types/genericData";
import { FilterProps } from "../../models/types/filter";
import { Filters } from "../../models/enums/filters";

export default function Filter({
  data,
}: GenericDataProps<FilterProps & FilterOptions>) {
  const metricOptions = [
    {
      value: Filters.TRACKS,
      label: i18n.t("topTracks"),
    },
    {
      value: Filters.ARTISTS,
      label: i18n.t("topArtist"),
    },
  ];

  const periodOptions = [
    {
      value: Filters.LAST_MONTH,
      label: i18n.t("lastMonth"),
    },
    {
      value: Filters.LAST_SIX_MONTHS,
      label: i18n.t("last6Months"),
    },
    {
      value: Filters.ALL_TIME,
      label: i18n.t("allTime"),
    },
  ];

  return (
    <View style={styles.filterSection}>
      <Dropdown
        data={{
          options: metricOptions,
          onSelect: (option: DropdownItemProps) =>
            data.getItems({ type: option, range: data.range }),
        }}
      />
      <Dropdown
        data={{
          options: periodOptions,
          onSelect: (option: DropdownItemProps) =>
            data.getItems({ range: option, type: data.type }),
        }}
      />
    </View>
  );
}
