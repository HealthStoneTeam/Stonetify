import React from "react";
import { View, Switch } from "react-native";
import { Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import styles from "./styles";
import { COLORS } from "../../models/constants";
import { GenericDataProps } from "../../models/types/genericData";
import { SwitchProps } from "../../models/types/switch";

export default function SwitchImage({ data }: GenericDataProps<SwitchProps>) {
  return (
    <View style={styles.switchContainer}>
      <Icon
        as={MaterialIcons}
        name="image"
        size={7}
        color={data.showImages ? COLORS.primary : COLORS.white}
      />
      <Switch
        value={data.showImages}
        onValueChange={data.setShowImages}
        trackColor={{ false: COLORS.white, true: COLORS.primary }}
        thumbColor={data.showImages ? COLORS.primary : COLORS.white}
      />
    </View>
  );
}
