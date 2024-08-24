import React, { useState } from "react";
import styles from "./styles";
import { Text, TouchableOpacity, View } from "react-native";
import { Icon, Divider } from "native-base";
import { Entypo } from "@expo/vector-icons";
import I18n from "../../../translations";
import { GenericDataProps } from "../../models/types/genericData";
import { DropdownItemProps, DropdownProps } from "../../models/types/dropdown";

export default function Dropdown({ data }: GenericDataProps<DropdownProps>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<DropdownItemProps>(
    data.selected ? data.selected : {} as DropdownItemProps
  );
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option: DropdownItemProps) => {
    setSelectedOption(option);
    data.onSelect(option);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.selectField} onPress={toggleDropdown}>
        <Text style={styles.textSelectField}>
          {selectedOption?.label || I18n.t("selectOption")}
        </Text>

        {isOpen ? (
          <Icon as={Entypo} name="chevron-thin-up" size={5} color={"#FFF"} />
        ) : (
          <Icon as={Entypo} name="chevron-thin-down" size={5} color={"#FFF"} />
        )}
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.optionsField}>
          {data.options.map((item, index) => (
            <View key={index.toString()}>
              <TouchableOpacity onPress={() => handleSelectOption(item)}>
                <Text style={styles.textOptionsField}>{item?.label}</Text>
              </TouchableOpacity>
              {index < data.options.length - 1 && (
                <Divider my="2" bg="#7B7B7B" />
              )}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
