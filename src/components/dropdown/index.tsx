import React, { useState } from "react";
import styles from "./styles";
import { Text, TouchableOpacity, View } from "react-native";
import { Icon, Divider } from "native-base";
import { Entypo } from "@expo/vector-icons";
import I18n from "../../../translations";

export default function Dropdown({ options, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option) => {
    setSelectedOption(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.selectField} onPress={toggleDropdown}>
        <Text style={styles.textSelectField}>
          {selectedOption?.value || I18n.t("selectOption")}
        </Text>

        {isOpen ? (
          <Icon as={Entypo} name="chevron-thin-up" size={5} color={"#FFF"} />
        ) : (
          <Icon as={Entypo} name="chevron-thin-down" size={5} color={"#FFF"} />
        )}
      </TouchableOpacity>
      {isOpen && (
        <View style={styles.optionsField}>
          {options.map((item, index) => (
            <View key={index.toString()}>
              <TouchableOpacity onPress={() => handleSelectOption(item)}>
                <Text style={styles.textOptionsField}>{item?.value}</Text>
              </TouchableOpacity>
              {index < options.length - 1 && <Divider my="2" bg="#7B7B7B" />}
            </View>
          ))}
        </View>
      )}
    </View>
  );
}
