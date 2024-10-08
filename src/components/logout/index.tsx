import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, Modal, Alert } from "react-native";
import { Icon } from "native-base";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AuthContext } from "../../contexts/auth";
import styles from "./styles";
import I18n from "../../../translations";
import { NavigationProps } from "../../models/types/navigation";
import { Pages } from "../../models/enums/pages";

export default function Logout({ navigation }: NavigationProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClose = () => setIsOpen(false);
  const { logout } = useContext(AuthContext);

  async function onLogout() {
    try {
      await logout();
      onClose();
      navigation.navigate(Pages.LOGIN);
    } catch (error) {
      Alert.alert(I18n.t("error"), I18n.t("logoutError"));
    }
  }

  return (
    <>
      <Icon
        as={MaterialCommunityIcons}
        name="logout"
        size={10}
        color={"#1DB954"}
        onPress={() => setIsOpen(!isOpen)}
      />
      <Modal
        animationType="none"
        transparent={true}
        visible={isOpen}
        onRequestClose={onClose}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{I18n.t("leaveConfirmation")}</Text>
            <View style={styles.containerButtons}>
              <TouchableOpacity
                style={{ ...styles.button, ...styles.confirmButton }}
                onPress={onLogout}
              >
                <Text style={styles.textStyle}>{I18n.t("confirm")}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ ...styles.button, ...styles.cancelButton }}
                onPress={onClose}
              >
                <Text style={styles.textStyle}>{I18n.t("cancel")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
