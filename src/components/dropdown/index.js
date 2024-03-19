import React, { useState } from "react";
import styles from "./styles";
import { Text, TouchableOpacity, FlatList, View } from "react-native";
import { Icon, Divider } from "native-base";
import { Entypo } from "@expo/vector-icons";

export default function Dropdown({ options, onSelect, selected }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(selected);

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
        <Text style={styles.textSelectField}>{selectedOption?.value}</Text>

        {isOpen ? (
          <Icon as={Entypo} name="chevron-thin-up" size={5} color={"#FFF"} />
        ) : (
          <Icon as={Entypo} name="chevron-thin-down" size={5} color={"#FFF"} />
        )}
      </TouchableOpacity>
      {isOpen && (
        <FlatList
          style={styles.optionsField}
          ItemSeparatorComponent={<Divider my="2" bg="#7B7B7B" />}
          data={options}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <>
              <TouchableOpacity
                key={index.toString()}
                onPress={() => handleSelectOption(item)}
              >
                <Text style={styles.textOptionsField}>{item?.value}</Text>
              </TouchableOpacity>
            </>
          )}
        />
      )}
    </View>
  );
}
