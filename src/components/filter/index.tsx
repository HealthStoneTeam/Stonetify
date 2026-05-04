import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import I18n from "../../../translations";
import { Filters } from "../../models/enums/filters";
import { DropdownItemProps } from "../../models/types/dropdown";
import { GenericDataProps } from "../../models/types/genericData";
import { FilterProps, TopItemsLimit } from "../../models/types/filter";
import styles from "./styles";

type Option = DropdownItemProps;

const limitOptions: TopItemsLimit[] = [5, 10, 20, 50];

export default function Filter({ data }: GenericDataProps<FilterProps>) {
  const metricOptions: Option[] = [
    {
      value: Filters.TRACKS,
      label: I18n.t("topTracks"),
    },
    {
      value: Filters.ARTISTS,
      label: I18n.t("topArtist"),
    },
  ];

  const periodOptions: Option[] = [
    {
      value: Filters.LAST_MONTH,
      label: I18n.t("lastMonth"),
    },
    {
      value: Filters.LAST_SIX_MONTHS,
      label: I18n.t("last6Months"),
    },
    {
      value: Filters.ALL_TIME,
      label: I18n.t("allTime"),
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
      <View style={styles.primaryPanel}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.eyebrow}>{I18n.t("filters")}</Text>
            <Text style={styles.title}>{I18n.t("chooseYourView")}</Text>
          </View>
          {data.limit === 50 && (
            <View style={styles.curiosityBadge}>
              <Text style={styles.curiosityBadgeText}>Top 50</Text>
            </View>
          )}
        </View>

        <View style={styles.filterBlock}>
          <Text style={styles.label}>{I18n.t("metricLabel")}</Text>
          <View style={styles.segmentedControl}>
            {metricOptions.map((option) =>
              renderSegment(option, data.type.value, data.onTypeSelect)
            )}
          </View>
        </View>

        <View style={styles.filterBlock}>
          <Text style={styles.label}>{I18n.t("periodLabel")}</Text>
          <View style={styles.segmentedControl}>
            {periodOptions.map((option) =>
              renderSegment(option, data.range.value, data.onRangeSelect)
            )}
          </View>
        </View>

        <View style={styles.filterBlock}>
          <Text style={styles.label}>{I18n.t("quantity")}</Text>
          <View style={styles.chipRow}>
            {limitOptions.map((option) => {
              const isSelected = data.limit === option;

              return (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.limitChip,
                    option === 50 && styles.limitChipCuriosity,
                    isSelected && styles.limitChipActive,
                  ]}
                  onPress={() => data.onLimitSelect(option)}
                >
                  <Text
                    style={[
                      styles.limitChipText,
                      isSelected && styles.limitChipTextActive,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <Text style={styles.quantityHint}>{I18n.t("quantityHint")}</Text>
        </View>
      </View>
    </View>
  );
}
